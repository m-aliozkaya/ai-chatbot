'use client';

import React from 'react';
import { mockPatients } from '@/app/data/mockPatients';
import styles from './PatientDetail.module.css';
import { Session } from 'next-auth';

interface PatientDetailProps {
  session: Session | null;
  hastaId: string;
}

export function PatientDetail({ session, hastaId }: PatientDetailProps) {
  const patient = mockPatients.find(p => p.id === parseInt(hastaId));

  if (!patient) {
    return <div className="p-4">Hasta bulunamadı.</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Hasta Bilgileri</h1>
        <div className={styles.patientInfo}>
          <span>İsim: {patient.name}</span>
          <span>•</span>
          <span>Yaş: {patient.age}</span>
          <span>•</span>
          <span>Cinsiyet: {patient.gender}</span>
        </div>
      </div>

      <div className={styles.section}>
        <h2>Hasta Öyküsü</h2>
        <p>{patient.history}</p>
      </div>
      
      <div className={styles.grid}>
        <div className={styles.card}>
          <h3>Teşhisler</h3>
          <ul>
            {patient.diagnosis.map((diagnosis, index) => (
              <li key={index}>{diagnosis}</li>
            ))}
          </ul>
        </div>
        
        <div className={styles.card}>
          <h3>Tedaviler</h3>
          <ul>
            {patient.treatments.map((treatment, index) => (
              <li key={index}>{treatment}</li>
            ))}
          </ul>
        </div>
        
        <div className={styles.card}>
          <h3>Testler</h3>
          <ul>
            {patient.tests.map((test, index) => (
              <li key={index}>{test}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
} 