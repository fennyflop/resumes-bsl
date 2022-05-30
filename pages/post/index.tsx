import { useContext } from 'react';
import styles from './post.module.css';
import { UserContext } from '../../contexts/user';
import Link from 'next/link';
import PostResumeForm from '../../components/post-resume-form/post-resume-form';

const Post = () => {
    const { user, setUser } = useContext(UserContext);
    return (
        <main className={styles.main}>
            {
            user?.access_token ?
            <PostResumeForm />
            :
            <section className={styles.auth}>
                <p className={styles.text}>Here holders of blocksmith labs can post their resume.</p>
                <div className={styles.links}>
                    <Link href="https://magiceden.io/marketplace/blocksmith_labs"><a className={styles.link}>Buy a BSL</a></Link>
                    <Link href="https://discord.com/api/oauth2/authorize?client_id=978918766408790056&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=code&scope=identify%20guilds.members.read"><a className={styles.link}>Connect Discord</a></Link>
                </div>
            </section>
            }
        </main>
    );
}

export default Post;