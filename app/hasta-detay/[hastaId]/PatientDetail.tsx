'use client';

import React, { useState } from 'react';
import { mockPatients } from '@/app/data/mockPatients';
import styles from './PatientDetail.module.css';
import { Session } from 'next-auth';

interface PatientDetailProps {
  session: Session | null;
  hastaId: string;
}

export function PatientDetail({ session, hastaId }: PatientDetailProps) {
  const patient = mockPatients.find(p => p.id === parseInt(hastaId));
  const [isEditing, setIsEditing] = useState(false);
  const [patientHistory, setPatientHistory] = useState(patient?.history || '');

  if (!patient) {
    return <div className="p-4">Hasta bulunamadı.</div>;
  }

  const handleSave = () => {
    // In a real application, you would save this to your database
    // For now, we'll just update the local state and exit edit mode
    patient.history = patientHistory;
    setIsEditing(false);
  };

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
        <div className={styles.sectionHeader}>
          <h2>Hasta Öyküsü</h2>
          <button 
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className={styles.editButton}
          >
            {isEditing ? 'Kaydet' : 'Düzenle'}
          </button>
        </div>
        {isEditing ? (
          <textarea
            value={patientHistory}
            onChange={(e) => setPatientHistory(e.target.value)}
            className={styles.historyTextarea}
            rows={5}
          />
        ) : (
          <p>{patient.history}</p>
        )}
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