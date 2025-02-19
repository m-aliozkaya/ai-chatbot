'use client';

import { PanelRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useMedicationsSidebar } from './ui/medications-sidebar-context';

export function MedicationsToggle() {
  const { toggleSidebar } = useMedicationsSidebar();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={toggleSidebar}
          variant="outline"
          className="md:px-2 md:h-[34px]"
        >
          <PanelRightIcon className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="left">Toggle Medications</TooltipContent>
    </Tooltip>
  );
} 