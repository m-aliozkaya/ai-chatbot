'use client';

import React, { useState } from 'react';
import styles from './Components.module.css';

const Diagnoses = () => {
  const [diagnoses, setDiagnoses] = useState<string[]>([]);
  const [newDiagnosis, setNewDiagnosis] = useState('');

  const addDiagnosis = () => {
    if (newDiagnosis.trim()) {
      setDiagnoses([...diagnoses, newDiagnosis.trim()]);
      setNewDiagnosis('');
    }
  };

  return (
    <div className={styles.componentContainer}>
      <div className={styles.inputGroup}>
        <input
          type="text"
          value={newDiagnosis}
          onChange={(e) => setNewDiagnosis(e.target.value)}
          placeholder="Yeni teşhis ekle..."
          className={styles.input}
        />
        <button onClick={addDiagnosis} className={styles.addButton}>
          Ekle
        </button>
      </div>
      <ul className={styles.list}>
        {diagnoses.map((diagnosis, index) => (
          <li key={index} className={styles.listItem}>
            {diagnosis}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Diagnoses; 