import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>CRUD Completo</h1>
      <nav className={styles.nav}>
        <Link href="/get">GET</Link>
        <Link href="/post">POST</Link>
        <Link href="/put">PUT</Link>
        <Link href="/delete">DELETE</Link>
      </nav>
    </div>
  );
}