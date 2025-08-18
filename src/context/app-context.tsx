
'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { returnsHistory as initialReturns } from '@/lib/returns-data';
import { orders as initialOrders } from '@/lib/orders-data';
import { Garment } from '@/lib/garments';
import { v4 as uuidv4 } from 'uuid';

export type Order = (typeof initialOrders)[0];
export type ReturnEntry = (typeof initialReturns)[0];
export type CartItem = Garment & {
  id: string;
  purchaseType: 'Buy' | 'Rent';
  price: number;
  customizationNote?: string;
};

interface AppContextType {
  orders: Order[];
  addOrder: (order: Order) => void;
  addMultipleOrders: (newOrders: Order[]) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  returns: ReturnEntry[];
  addReturn: (returnEntry: ReturnEntry) => void;
  cart: CartItem[];
  addToCart: (item: Garment, purchaseType: 'Buy' | 'Rent') => void;
  removeFromCart: (itemId: string) => void;
  updateCartItemNote: (itemId: string, note: string) => void;
  clearCart: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [returns, setReturns] = useState<ReturnEntry[]>(initialReturns);
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: Garment, purchaseType: 'Buy' | 'Rent') => {
    const price = purchaseType === 'Buy' ? item.price : item.rentPrice;
    const cartItem: CartItem = { ...item, id: uuidv4(), purchaseType, price, customizationNote: '' };
    setCart(prevCart => [...prevCart, cartItem]);
  };

  const removeFromCart = (itemId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };
  
  const updateCartItemNote = (itemId: string, note: string) => {
    setCart(prevCart => 
        prevCart.map(item => 
            item.id === itemId ? { ...item, customizationNote: note } : item
        )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const addOrder = (order: Order) => {
    setOrders(prevOrders => [order, ...prevOrders]);
  };

  const addMultipleOrders = (newOrders: Order[]) => {
    setOrders(prevOrders => [...newOrders, ...prevOrders]);
  };
  
  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  const addReturn = (returnEntry: ReturnEntry) => {
    setReturns(prevReturns => [returnEntry, ...prevReturns]);
  };

  return (
    <AppContext.Provider value={{ 
        orders, 
        addOrder,
        addMultipleOrders,
        updateOrderStatus, 
        returns, 
        addReturn,
        cart,
        addToCart,
        removeFromCart,
        updateCartItemNote,
        clearCart,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
