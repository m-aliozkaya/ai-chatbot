'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { useRightSidebar } from './right-sidebar-context';

const SIDEBAR_WIDTH = '32rem';
const SIDEBAR_WIDTH_MOBILE = '32rem';

export function RightSidebar({
  children,
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const isMobile = useIsMobile();
  const { isOpen, setIsOpen } = useRightSidebar();

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          className="w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
          style={{
            '--sidebar-width': SIDEBAR_WIDTH_MOBILE,
          } as React.CSSProperties}
          side="right"
        >
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      className={cn(
        'group peer hidden md:block text-sidebar-foreground',
        className
      )}
      data-state={isOpen ? 'expanded' : 'collapsed'}
      {...props}
    >
      <div
        className={cn(
          'duration-200 relative h-svh w-[--sidebar-width] bg-transparent transition-[width] ease-linear',
          !isOpen && 'w-0'
        )}
        style={{
          '--sidebar-width': SIDEBAR_WIDTH,
        } as React.CSSProperties}
      />
      <div
        className={cn(
          'duration-200 fixed inset-y-0 right-0 z-10 hidden h-svh w-[--sidebar-width] transition-[right,width] ease-linear md:flex',
          !isOpen && 'right-[calc(var(--sidebar-width)*-1)]',
        )}
        style={{
          '--sidebar-width': SIDEBAR_WIDTH,
        } as React.CSSProperties}
      >
        <div className="flex h-full w-full flex-col bg-sidebar border-l">
          {children}
        </div>
      </div>
    </div>
  );
} 