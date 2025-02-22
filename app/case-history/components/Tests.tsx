'use client';

import React, { useState } from 'react';
import styles from './Components.module.css';

const Tests = () => {
  const [tests, setTests] = useState<string[]>([]);
  const [newTest, setNewTest] = useState('');

  const addTest = () => {
    if (newTest.trim()) {
      setTests([...tests, newTest.trim()]);
      setNewTest('');
    }
  };

  return (
    <div className={styles.componentContainer}>
      <div className={styles.inputGroup}>
        <input
          type="text"
          value={newTest}
          onChange={(e) => setNewTest(e.target.value)}
          placeholder="Yeni test ekle..."
          className={styles.input}
        />
        <button onClick={addTest} className={styles.addButton}>
          Ekle
        </button>
      </div>
      <ul className={styles.list}>
        {tests.map((test, index) => (
          <li key={index} className={styles.listItem}>
            {test}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tests; 