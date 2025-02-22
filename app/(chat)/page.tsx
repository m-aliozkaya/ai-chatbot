import PatientHistory from '../case-history/components/PatientHistory';
import Treatments from '../case-history/components/Treatments';
import Diagnoses from '../case-history/components/Diagnoses';
import Tests from '../case-history/components/Tests';
import styles from '../case-history/CaseHistory.module.css';
import { ChatHeader } from '@/components/chat-header';

export default async function Page() {
  return (
    <>
      <ChatHeader />
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
    </>
  );
}
