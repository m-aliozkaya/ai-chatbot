'use client';

import React, { useState } from 'react';
import styles from './Components.module.css';

const Treatments = () => {
  const [treatments, setTreatments] = useState<string[]>([]);
  const [newTreatment, setNewTreatment] = useState('');

  const addTreatment = () => {
    if (newTreatment.trim()) {
      setTreatments([...treatments, newTreatment.trim()]);
      setNewTreatment('');
    }
  };

  return (
    <div className={styles.componentContainer}>
      <div className={styles.inputGroup}>
        <input
          type="text"
          value={newTreatment}
          onChange={(e) => setNewTreatment(e.target.value)}
          placeholder="Yeni tedavi ekle..."
          className={styles.input}
        />
        <button onClick={addTreatment} className={styles.addButton}>
          Ekle
        </button>
      </div>
      <ul className={styles.list}>
        {treatments.map((treatment, index) => (
          <li key={index} className={styles.listItem}>
            {treatment}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Treatments; 