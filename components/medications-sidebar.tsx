'use client';

import type { User } from 'next-auth';
import { PillIcon } from 'lucide-react';
import { PanelRightIcon } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

// This is a temporary mock data, you should replace it with real data from your backend
const mockMedications = [
  { id: 1, name: 'Aspirin', dosage: '100mg', frequency: 'Daily' },
  { id: 2, name: 'Paracetamol', dosage: '500mg', frequency: 'As needed' },
  { id: 3, name: 'Ibuprofen', dosage: '400mg', frequency: 'Twice daily' },
];

export function MedicationsSidebar({ user }: { user: User | undefined }) {
  const { setOpenMobile, toggleSidebar } = useSidebar();

  return (
    <Sidebar side="right" collapsible="offcanvas" className="group-data-[side=right]:border-l">
      <SidebarHeader>
        <SidebarMenu>
          <div className="flex flex-row justify-between items-center">
            <span className="text-lg font-semibold px-2">
              Medications
            </span>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="p-2 h-fit"
                  onClick={toggleSidebar}
                >
                  <PanelRightIcon className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent align="start">Toggle Medications</TooltipContent>
            </Tooltip>
          </div>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            {mockMedications.map((medication) => (
              <SidebarMenuItem key={medication.id}>
                <SidebarMenuButton
                  onClick={() => {
                    setOpenMobile(false);
                    // Add action when medication is clicked
                  }}
                >
                  <PillIcon className="w-4 h-4" />
                  <div className="flex flex-col">
                    <span>{medication.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {medication.dosage} - {medication.frequency}
                    </span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
} 