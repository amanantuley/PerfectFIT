
'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { returnsHistory as initialReturns } from '@/lib/returns-data';
import { orders as initialOrders } from '@/lib/orders-data';

export type Order = (typeof initialOrders)[0];
export type ReturnEntry = (typeof initialReturns)[0];

interface AppContextType {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  returns: ReturnEntry[];
  addReturn: (returnEntry: ReturnEntry) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [returns, setReturns] = useState<ReturnEntry[]>(initialReturns);

  const addOrder = (order: Order) => {
    setOrders(prevOrders => [order, ...prevOrders]);
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
    <AppContext.Provider value={{ orders, addOrder, updateOrderStatus, returns, addReturn }}>
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
