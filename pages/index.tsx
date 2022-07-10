import type { NextPage } from 'next';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  useEffect(() => {
    toast.info('Projeto agenda');
  }, []);

  return <h1 className={styles.crimson}>Projeto agenda</h1>;
};

export default Home;
