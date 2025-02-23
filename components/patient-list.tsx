'use client';

import { useRouter } from 'next/navigation';
import { mockPatients } from '@/app/data/mockPatients';
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { UserIcon } from 'lucide-react';

export function PatientList() {
  const router = useRouter();

  return (
    <SidebarContent className="py-2">
      <SidebarGroup>
        <SidebarGroupLabel>Hastalar</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {mockPatients.map((patient) => (
              <SidebarMenuItem key={patient.id}>
                <SidebarMenuButton
                  onClick={() => {
                    router.push(`/hasta-detay/${patient.id}`);
                  }}
                >
                  <UserIcon className="h-4 w-4" />
                  <span>{patient.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
} 