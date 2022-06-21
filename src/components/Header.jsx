import styles from './Header.module.css';
import rocketLogo from '../assets/rocket.svg';

export function Header() {

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={rocketLogo} alt="logotipo de foguete" />
        <p><span className={styles.to}>to</span><span className={styles.do}>do</span></p>
      </div>

    </header>
  )
}