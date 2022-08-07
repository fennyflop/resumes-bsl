// import url from 'url';
import axios from 'axios';
import type { NextPage } from 'next';

import styles from './main.module.css';

import Link from 'next/link';
import { TUser, TUserData } from '../utils/types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Header from '../components/header/header';

const DAOSMITH_ROLE_ID = '956637149254533180';
const BLOCKSMITH_LABS_ID = '940349390038655048';

const Home: NextPage = () => {
  const router = useRouter();

  const getProfile = async (user: TUser) => {
    if (!user) return false;
    const {data: userData} = await axios.get('https://discord.com/api/v10/users/@me', {headers: {'Authorization': `${user?.token_type} ${user?.access_token}`}});
    console.log(userData);
  }

  // const discordAuthorize = async (code: string) => {
    // return fetch(`/api/auth?code=${code}`)
    // .then((res) => res.json())
    // .then(async ({user}: any) => {
    //   if (!user) throw "User not found.";
    //   setUser(user);
    //   getProfile(user);
    //   localStorage.setItem("refresh_token", user.refresh_token);
    //   // console.log(await isAuthorized(user));
    // })
  // }

  // useEffect(() => {
  //   const refreshToken = localStorage.getItem("refresh_token");
    
  //   if (refreshToken && refreshToken?.length === 30) {
  //     fetch(`/api/refresh?code=${refreshToken}`)
  //     .then((res) => res.json())
  //     .then(async ({user}) => {
  //       setUser(user);
  //       getProfile(user);
  //       console.log("refresh call:", user);
  //       localStorage.setItem("refresh_token", user.refresh_token);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //   }
  // }, [])

  // useEffect(() => {
  //   const { code } = router.query;
  //   if (code?.length === 30 && user?.access_token?.length !== 30) {
  //     discordAuthorize(code);
  //   }
  // }, [router])

  return (
    <>
      {/* <Header /> */}
    <main className={styles.main}>
      <p className={styles.welcome}>This is a mineable viable product for the blocksmith resume builder (it still works and has a functioning backend! Check out the post and find pages). Contact me at fennyflop@gmail.com for any ideas or if you want to design :)</p>
    </main>
    </>
  )
}

export default Home
