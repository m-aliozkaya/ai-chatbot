'use client';

import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useRightSidebar } from './ui/right-sidebar-context';
import { SidebarRightIcon, MoonIcon, SunIcon } from './icons';

export function MedicationsToggle() {
  const { toggleSidebar } = useRightSidebar();
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            variant="outline"
            className="md:px-2 md:h-fit"
          >
            {theme === 'dark' ? <MoonIcon size={16} /> : <SunIcon size={16} />}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">Toggle theme</TooltipContent>
      </Tooltip>
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
    </div>
  );
} 