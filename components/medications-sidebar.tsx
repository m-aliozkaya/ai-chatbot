'use client';

import type { User } from 'next-auth';
import { PillIcon } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { useMedicationsSidebar } from './ui/medications-sidebar-context';

// This is a temporary mock data, you should replace it with real data from your backend
const mockMedications = [
  { id: 1, name: 'Aspirin', dosage: '100mg', frequency: 'Daily' },
  { id: 2, name: 'Paracetamol', dosage: '500mg', frequency: 'As needed' },
  { id: 3, name: 'Ibuprofen', dosage: '400mg', frequency: 'Twice daily' },
];

export function MedicationsSidebar({ user }: { user: User | undefined }) {
  return (
    <Sidebar 
      side="right" 
      collapsible="offcanvas"
      className="border-l"
    >
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
      <SidebarRail />
    </Sidebar>
  );
} 