import Link from 'next/link'

import styles from './styles.module.scss'

interface HeaderProps {
    backgroundColor: boolean;
}

export function Header({ backgroundColor }: HeaderProps) {
    return (
        <header className={`${styles.header} ${backgroundColor ? styles.headerBlack : ''}`}>
            <div className={styles.headerLogo}>
                <div>
                    <a href="/">
                        <img src="https://logodownload.org/wp-content/uploads/2014/10/netflix-logo-5.png" alt="Netflix" />
                    </a>
                </div>
                <div className={styles.headerHome}>
                    <Link href="/">
                        <a>Início</a>
                    </Link>
                </div>
            </div>
            <div className={styles.headerUser}>
                <a href="/">
                    <img src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png" alt="Netflix" />
                </a>
            </div>
        </header>
    )
}