'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

export type SubscriptionPlan = 'Basic' | 'Pro' | 'Ultimate' | null;

interface SubscriptionContextType {
  activePlan: SubscriptionPlan;
  setActivePlan: (plan: SubscriptionPlan) => void;
  discount: number;
  isPremium: boolean;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [activePlan, setActivePlan] = useState<SubscriptionPlan>(null);

  const getDiscount = (plan: SubscriptionPlan): number => {
    switch (plan) {
      case 'Basic':
        return 10;
      case 'Pro':
        return 25;
      case 'Ultimate':
        return 40;
      default:
        return 0;
    }
  };

  const discount = getDiscount(activePlan);
  const isPremium = activePlan !== null;


  return (
    <SubscriptionContext.Provider value={{ activePlan, setActivePlan, discount, isPremium }}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}
