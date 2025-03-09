import React from 'react';
import { auth } from '@/app/(auth)/auth';
import { cookies } from 'next/headers';
import { PatientDetail } from './PatientDetail';

export default async function HastaDetayPage({ params }: { params: { hastaId: string } }) {
  const [session, cookieStore, resolvedParams] = await Promise.all([auth(), cookies(), params]);

  return <PatientDetail session={session} hastaId={resolvedParams.hastaId} />;
}
