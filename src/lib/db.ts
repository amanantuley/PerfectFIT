import { db } from './firebase';
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  query, 
  where 
} from 'firebase/firestore';
import { garments as initialGarments } from './garments';
import fs from 'fs/promises';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'perfectfit-db.json');

export type Product = {
  id: string;
  name: string;
  type: string;
  image: string;
  dataAiHint: string;
  price: number;
  rentPrice: number;
  description: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
};

export type Order = {
  id: string;
  userId: string;
  items: { product: Product; quantity: number; purchaseType: 'Buy' | 'Rent' }[];
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
  createdAt: string;
};

const defaultProducts: Product[] = initialGarments.map((g, index) => ({
  ...g,
  id: `prod_${index + 1}`,
  description: `Premium ${g.name.toLowerCase()} crafted for perfect fit and unparalleled comfort.`,
  rating: Number((Math.random() * (5 - 3.5) + 3.5).toFixed(1)),
  reviewCount: Math.floor(Math.random() * 500) + 10,
  inStock: true,
}));

// Local fallback database operations
async function getLocalDb(): Promise<{ products: Product[]; orders: Order[] }> {
  try {
    const data = await fs.readFile(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    const defaultDb = { products: defaultProducts, orders: [] };
    await fs.writeFile(DB_FILE, JSON.stringify(defaultDb, null, 2));
    return defaultDb;
  }
}

async function saveLocalDb(data: { products: Product[]; orders: Order[] }): Promise<void> {
  await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2));
}

// Function to seed products into Firestore if they don't exist
async function seedProductsIfNeeded() {
  try {
    const productsCol = collection(db, 'products');
    const snapshot = await getDocs(productsCol);
    if (snapshot.empty) {
      console.log('Seeding products to Firestore...');
      for (const prod of defaultProducts) {
        await setDoc(doc(productsCol, prod.id), prod);
      }
      console.log('Seeding complete.');
    }
  } catch (err) {
    console.warn('Firestore seeding skipped (using local fallback if needed). Error:', err);
  }
}

export async function getProducts(): Promise<Product[]> {
  try {
    await seedProductsIfNeeded();
    const productsCol = collection(db, 'products');
    const snapshot = await getDocs(productsCol);
    const products: Product[] = [];
    snapshot.forEach(doc => {
      products.push(doc.data() as Product);
    });
    if (products.length > 0) return products;
    
    const localDb = await getLocalDb();
    return localDb.products;
  } catch (error) {
    console.warn('Error fetching products from Firestore, falling back to local DB. Error:', error);
    const localDb = await getLocalDb();
    return localDb.products;
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const docRef = doc(db, 'products', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as Product;
    }
    const localDb = await getLocalDb();
    return localDb.products.find(p => p.id === id) || null;
  } catch (error) {
    console.warn(`Error fetching product ${id} from Firestore, falling back to local DB. Error:`, error);
    const localDb = await getLocalDb();
    return localDb.products.find(p => p.id === id) || null;
  }
}

export async function createOrder(order: Omit<Order, 'id' | 'createdAt' | 'status'>): Promise<Order> {
  const orderId = `ord_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  const newOrder: Order = {
    ...order,
    id: orderId,
    status: 'Pending',
    createdAt: new Date().toISOString(),
  };

  try {
    const ordersCol = collection(db, 'orders');
    await setDoc(doc(ordersCol, orderId), newOrder);
    return newOrder;
  } catch (error) {
    console.warn('Error creating order in Firestore, falling back to local DB. Error:', error);
    const localDb = await getLocalDb();
    localDb.orders.push(newOrder);
    await saveLocalDb(localDb);
    return newOrder;
  }
}

export async function getUserOrders(userId: string): Promise<Order[]> {
  try {
    const ordersCol = collection(db, 'orders');
    const q = query(ordersCol, where('userId', '==', userId));
    const snapshot = await getDocs(q);
    const orders: Order[] = [];
    snapshot.forEach(doc => {
      orders.push(doc.data() as Order);
    });
    if (orders.length > 0) {
      return orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    
    const localDb = await getLocalDb();
    return localDb.orders
      .filter(o => o.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    console.warn(`Error fetching orders for user ${userId} from Firestore, falling back to local DB. Error:`, error);
    const localDb = await getLocalDb();
    return localDb.orders
      .filter(o => o.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
}
