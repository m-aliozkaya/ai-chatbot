'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useRightSidebar } from './ui/right-sidebar-context';
import { SidebarRightIcon, MoonIcon, SunIcon } from './icons';

export function MedicationsToggle() {
  const [mounted, setMounted] = useState(false);
  const { toggleSidebar } = useRightSidebar();
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="outline" className="md:px-2 md:h-fit" />
        <Button variant="outline" className="md:px-2 md:h-fit" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            variant="outline"
            className="md:px-2 md:h-fit"
          >
            {theme === 'dark' ? <SunIcon size={16} /> : <MoonIcon size={16} />}
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