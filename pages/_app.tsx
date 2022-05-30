import '../normalize.css'
import axios from 'axios';
import type { AppProps } from 'next/app'
import { TUser, TUserData } from '../utils/types'
import { useEffect, useState } from 'react'
import { UserContext } from '../contexts/user';
import { useRouter } from 'next/router';
import Header from '../components/header/header';

const DAOSMITH_ROLE_ID = '956637149254533180';
const BLOCKSMITH_LABS_ID = '940349390038655048';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const [user, setUser] = useState<TUserData>({username: '', avatar: '', access_token: '', authorized: false, id: ''});

  const updateUser = async (info: TUser) => {
    if (!info) throw "User is undefined."
    const { token_type, access_token, refresh_token } = info;

    localStorage.setItem("refresh_token", refresh_token);

    const { data } = await axios.get('https://discord.com/api/v10/users/@me', {headers: {'Authorization': `${token_type} ${access_token}`}});
    const { data: guild } = await axios.get(`https://discord.com/api/v10/users/@me/guilds/${BLOCKSMITH_LABS_ID}/member`, {headers: {'Authorization': `${token_type} ${access_token}`}}) || false;
    const authorized: boolean = guild.roles.find((role: string) => role === DAOSMITH_ROLE_ID) ? true : false;
    setUser({username: data.username, avatar: data.avatar, id: data.id, access_token, authorized});
  }

  useEffect(() => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (refreshToken && refreshToken?.length === 30) {
      fetch(`/api/refresh?code=${refreshToken}`)
      .then((res) => res.json())
      .then(async ({user: info}) => {
        updateUser(info);
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }, []);

  useEffect(() => {
    const { code } = router.query;

    if (!user?.access_token && code?.length === 30) {
      fetch(`/api/auth?code=${code}`)
      .then((res) => res.json())
      .then(async ({user: info}: any) => {
        updateUser(info);  
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }, [router])


  useEffect(() => {
    console.log(user);
  }, [user])

  return (
    <UserContext.Provider value={{user, setUser}}>
      <div className="container">
        <Header />
        <Component {...pageProps} />
      </div>
    </UserContext.Provider>
  )
}

export default MyApp
