'use client';

import React from 'react';
import PatientHistory from './components/PatientHistory';
import Treatments from './components/Treatments';
import Diagnoses from './components/Diagnoses';
import Tests from './components/Tests';
import styles from './CaseHistory.module.css';

const CaseHistoryPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.historySection}>
        <h2>Hasta Öyküsü</h2>
        <PatientHistory />
      </div>
      
      <div className={styles.cardsContainer}>
        <div className={styles.card}>
          <h3>Tedaviler</h3>
          <Treatments />
        </div>
        
        <div className={styles.card}>
          <h3>Teşhisler</h3>
          <Diagnoses />
        </div>
        
        <div className={styles.card}>
          <h3>Test</h3>
          <Tests />
        </div>
      </div>
    </div>
  );
};

export default CaseHistoryPage; 