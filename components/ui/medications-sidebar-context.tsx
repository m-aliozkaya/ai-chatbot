'use client';

import * as React from 'react';

type MedicationsSidebarContext = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggleSidebar: () => void;
};

const MedicationsSidebarContext = React.createContext<MedicationsSidebarContext | null>(null);

export function MedicationsSidebarProvider({
  children,
  defaultOpen = true,
}: {
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  const toggleSidebar = React.useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const value = React.useMemo(
    () => ({
      isOpen,
      setIsOpen,
      toggleSidebar,
    }),
    [isOpen, toggleSidebar]
  );

  return (
    <MedicationsSidebarContext.Provider value={value}>
      {children}
    </MedicationsSidebarContext.Provider>
  );
}

export function useMedicationsSidebar() {
  const context = React.useContext(MedicationsSidebarContext);
  if (!context) {
    throw new Error('useMedicationsSidebar must be used within a MedicationsSidebarProvider');
  }
  return context;
} 