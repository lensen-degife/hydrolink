import React, { createContext, useContext } from 'react';
import { useDashboardData } from '@/hooks/useDashboardData';

type DashboardContextValue = ReturnType<typeof useDashboardData>;

const DashboardDataContext = createContext<DashboardContextValue | null>(null);

export function DashboardDataProvider({ children }: { children: React.ReactNode }) {
  const value = useDashboardData();
  return (
    <DashboardDataContext.Provider value={value}>{children}</DashboardDataContext.Provider>
  );
}

export function useDashboard() {
  const ctx = useContext(DashboardDataContext);
  if (!ctx) {
    throw new Error('useDashboard must be used within DashboardDataProvider');
  }
  return ctx;
}
