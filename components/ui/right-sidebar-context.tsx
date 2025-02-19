'use client';

import * as React from 'react';

type RightSidebarContext = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggleSidebar: () => void;
};

const RightSidebarContext = React.createContext<RightSidebarContext | null>(null);

const SIDEBAR_COOKIE_NAME = 'right-sidebar:state';
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 1 week

export function RightSidebarProvider({
  children,
  defaultOpen = true,
}: {
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  const toggleSidebar = React.useCallback(() => {
    setIsOpen((prev) => {
      const newState = !prev;
      // Update cookie when sidebar state changes
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${newState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
      return newState;
    });
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
    <RightSidebarContext.Provider value={value}>
      {children}
    </RightSidebarContext.Provider>
  );
}

export function useRightSidebar() {
  const context = React.useContext(RightSidebarContext);
  if (!context) {
    throw new Error('useRightSidebar must be used within a RightSidebarProvider');
  }
  return context;
} 