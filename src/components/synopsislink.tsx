import Link from "next/link";

import styles from '../styles/Home.module.css';


const Synopsis: React.FC = () => { 
  
  
    return (<Link href="/episodes">
    <a className={styles.imageCard}>
      <img src="" alt="" />
      <div className={styles.imageTitle}>text</div>
    </a>
  </Link>
);}

    


export default Synopsis;
