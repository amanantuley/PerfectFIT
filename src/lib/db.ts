import fs from 'fs/promises';
import path from 'path';
import { garments as initialGarments } from './garments';

// Simulating a scalable database (like Firestore or PostgreSQL)
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

type DatabaseSchema = {
  products: Product[];
  orders: Order[];
};

const defaultDb: DatabaseSchema = {
  products: initialGarments.map((g, index) => ({
    ...g,
    id: `prod_${index + 1}`,
    description: `Premium ${g.name.toLowerCase()} crafted for perfect fit and unparalleled comfort.`,
    rating: Number((Math.random() * (5 - 3.5) + 3.5).toFixed(1)),
    reviewCount: Math.floor(Math.random() * 500) + 10,
    inStock: true,
  })),
  orders: [],
};

export async function getDb(): Promise<DatabaseSchema> {
  try {
    const data = await fs.readFile(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, create it with default data
    await fs.writeFile(DB_FILE, JSON.stringify(defaultDb, null, 2));
    return defaultDb;
  }
}

export async function saveDb(data: DatabaseSchema): Promise<void> {
  await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2));
}

export async function getProducts(): Promise<Product[]> {
  const db = await getDb();
  return db.products;
}

export async function getProductById(id: string): Promise<Product | null> {
  const db = await getDb();
  return db.products.find(p => p.id === id) || null;
}

export async function createOrder(order: Omit<Order, 'id' | 'createdAt' | 'status'>): Promise<Order> {
  const db = await getDb();
  const newOrder: Order = {
    ...order,
    id: `ord_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    status: 'Pending',
    createdAt: new Date().toISOString(),
  };
  db.orders.push(newOrder);
  await saveDb(db);
  return newOrder;
}

export async function getUserOrders(userId: string): Promise<Order[]> {
  const db = await getDb();
  return db.orders.filter(o => o.userId === userId).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}
