import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Header.module.css'; // Import a CSS module for styling

const Header: React.FC = () => {
  const router = useRouter();

  const isActive = (pathname: string) => {
    return router.pathname === pathname ? styles.active : '';
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/">
          <p className={`${styles.link} ${isActive('/')}`}>Home</p>
        </Link>
        <Link href="/blogposts">
          <p className={`${styles.link} ${isActive('/blogposts')}`}>Blog Post</p>
        </Link>
        <Link href="/characters">
          <p className={`${styles.link} ${isActive('/characters')}`}>Characters</p>
        </Link>
        <Link href="/episodes">
          <p className={`${styles.link} ${isActive('/episodes')}`}>Episodes</p>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
