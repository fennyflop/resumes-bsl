import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { UserContext } from '../../contexts/user';
import styles from './header.module.css';

const Header = () => {
    const router = useRouter();
    const {user, setUser} = useContext(UserContext);

    const logout = async () => {
        fetch(`/api/revoke?code=${user.access_token}`)
        .then((res) => res.json())
        .then(() => {
            localStorage.removeItem("refresh_token");
            setUser({username: '', avatar: '', access_token: '', authorized: false, id: ''});
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
            <Link href="/">
                <a>
                  <Image width="80" height="80" src="/forge.svg" />
                </a>
            </Link>
                <Link href="/resumes"><a className={`${styles.link} ${router.pathname === '/resumes' ? styles.active : ''}`}>FIND</a></Link>
                <Link href="/post"><a className={`${styles.link} ${router.pathname === '/post' ? styles.active : ''}`}>POST</a></Link>
            </nav>
            <div className={styles.profile}>
                {
                    user.access_token ? 
                    <>
                        <p className={styles.username}>{user.username}</p>
                        <img className={styles.avatar} alt="User Avatar" src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.jpg`} />
                        <Image className={styles.exit} width="32" height="32" src="/exit.svg" onClick={logout} />
                    </>
                    :
                    <a href="https://discord.com/api/oauth2/authorize?client_id=978918766408790056&redirect_uri=https%3A%2F%2Fresumes-bsl.vercel.app&response_type=code&scope=identify%20guilds.members.read" className={styles.authorize}>Connect Discord</a>
                }   
            </div>

        </header>
    );
}

export default Header;