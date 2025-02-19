'use client';

import type { User } from 'next-auth';
import { PillIcon } from 'lucide-react';
import { PanelLeftIcon, PanelRightIcon } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useMedicationsSidebar } from './ui/medications-sidebar-context';

// This is a temporary mock data, you should replace it with real data from your backend
const mockMedications = [
  { id: 1, name: 'Aspirin', dosage: '100mg', frequency: 'Daily' },
  { id: 2, name: 'Paracetamol', dosage: '500mg', frequency: 'As needed' },
  { id: 3, name: 'Ibuprofen', dosage: '400mg', frequency: 'Twice daily' },
];

export function MedicationsSidebar({ user }: { user: User | undefined }) {
  const { isOpen, toggleSidebar } = useMedicationsSidebar();

  return (
    <div className="fixed right-0 top-0 h-full z-40 flex">
      {/* Main Sidebar */}
      <div className={`
        h-full bg-background border-l transition-transform duration-300
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="w-64 h-full flex flex-col">
          <div className="p-4 border-b flex justify-between items-center">
            <span className="text-lg font-semibold">Medications</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleSidebar}
                >
                  <PanelRightIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">Close Medications</TooltipContent>
            </Tooltip>
          </div>
          <div className="flex-1 overflow-auto p-4">
            <div className="space-y-2">
              {mockMedications.map((medication) => (
                <div
                  key={medication.id}
                  className="flex items-start space-x-3 p-2 rounded-md hover:bg-muted cursor-pointer"
                >
                  <PillIcon className="h-4 w-4 mt-1" />
                  <div className="flex flex-col">
                    <span>{medication.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {medication.dosage} - {medication.frequency}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Toggle Button when sidebar is closed */}
      <div className={`
        fixed right-4 top-4
        ${isOpen ? 'hidden' : 'block'}
      `}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleSidebar}
              className="shadow-sm"
            >
              <PanelLeftIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">Open Medications</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
} 