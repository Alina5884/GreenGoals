import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

function HomePage() {
  return (
    <div className={styles.homeContainer}>
        <h1 className={styles.heading}>Steps Towards an Eco-Friendly Life</h1>
        <p className={styles.paragraph}>Turn your intentions into actions! Click below to view your tasks for a greener world:</p>
        <Link to="/todos">
            <button className={styles.button}>View Tasks</button>
        </Link>
    </div>
  );
}

export default HomePage;
