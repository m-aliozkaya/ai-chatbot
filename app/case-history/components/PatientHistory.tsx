'use client';

import React, { useState } from 'react';
import styles from './Components.module.css';

const PatientHistory = () => {
  const [history, setHistory] = useState('');

  return (
    <div className={styles.historyContainer}>
      <textarea
        value={history}
        onChange={(e) => setHistory(e.target.value)}
        placeholder="Hasta öyküsünü buraya giriniz..."
        className={styles.historyTextarea}
      />
    </div>
  );
};

export default PatientHistory; 