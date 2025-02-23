import React from 'react';
import { auth } from '@/app/(auth)/auth';
import { cookies } from 'next/headers';
import { PatientDetail } from './PatientDetail';

export default async function HastaDetayPage({ params }: { params: { hastaId: string } }) {
  const [session, cookieStore] = await Promise.all([auth(), cookies()]);

  return <PatientDetail session={session} hastaId={params.hastaId} />;
} 