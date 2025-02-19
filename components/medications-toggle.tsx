'use client';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useRightSidebar } from './ui/right-sidebar-context';
import { SidebarRightIcon } from './icons';

export function MedicationsToggle() {
  const { toggleSidebar } = useRightSidebar();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={toggleSidebar}
          variant="outline"
          className="md:px-2 md:h-fit"
        >
          <SidebarRightIcon size={16} />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="left">Toggle Medications</TooltipContent>
    </Tooltip>
  );
} 