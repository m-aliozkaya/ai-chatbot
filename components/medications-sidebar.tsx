'use client';

import type { User } from 'next-auth';
import { PillIcon } from 'lucide-react';

import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { RightSidebar } from './ui/right-sidebar';
import { useRightSidebar } from './ui/right-sidebar-context';

// This is a temporary mock data, you should replace it with real data from your backend
const mockMedications = [
  { id: 1, name: 'Aspirin', dosage: '100mg', frequency: 'Daily' },
  { id: 2, name: 'Paracetamol', dosage: '500mg', frequency: 'As needed' },
  { id: 3, name: 'Ibuprofen', dosage: '400mg', frequency: 'Twice daily' },
];

export function MedicationsSidebar({ user }: { user: User | undefined }) {
  const { toggleSidebar } = useRightSidebar();

  return (
    <RightSidebar>
      <SidebarHeader>
        <SidebarMenu>
          <div className="flex flex-row justify-between items-center">
            <span className="text-lg font-semibold px-2">
              Medications
            </span>
          </div>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            {mockMedications.map((medication) => (
              <SidebarMenuItem key={medication.id}>
                <SidebarMenuButton>
                  <PillIcon className="h-4 w-4" />
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
      <button
        data-sidebar="rail"
        aria-label="Toggle Sidebar"
        tabIndex={-1}
        onClick={toggleSidebar}
        title="Toggle Sidebar"
        className="absolute inset-y-0 left-0 z-20 hidden w-4 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border cursor-w-resize sm:flex"
      />
    </RightSidebar>
  );
} 