'use client';

import { Button } from '@/components/ui/button';
import { MoonIcon, SunIcon } from '@/components/icons';
import { useTheme } from '@/components/theme-provider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-7 w-7"
      onClick={toggleTheme}
    >
      {theme === 'light' ? (
        <MoonIcon size={16} />
      ) : (
        <SunIcon size={16} />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
} 