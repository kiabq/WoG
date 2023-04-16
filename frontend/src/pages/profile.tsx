// Libraries
import Head from 'next/head';
import { GetServerSideProps } from "next";
import Cookies from 'cookies';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// Components
import Header from '@/components/header/Header';
import ProfileInfo from '@/components/profile/ProfileInfo';
import Footer from '@/components/footer/Footer';

// Context
import UserCtx, { getContext } from '@/context/usercontext';

// Types
import type { IUser } from '@/utils/types';

interface IProps {
  user: IUser
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const cookies = new Cookies(req, res);
  const token = cookies.get('token');

  const user = await axios.get(`http://${process.env.REACT_APP_BACKEND}/api/users/me?populate=*`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((res) => {
    if (res.status === 200) {
      return res.data;
    }
  }).catch(() => {
    return null;
  })

  return {
    props: { user }
  }
}

export default function Profile(props: IProps) {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (props.user === null) {
      router.push('/auth/logout');
    }

    if (props.user.isNew) {
      router.push('/');
    }

    setLoaded(true);
  }, [])

  if (props.user && loaded === true) {
    return (
      <>
        <Head>
          <title>World of Gaian - Profile</title>
        </Head>
        <UserCtx user={props.user}>
          <Header/>
          <main className='max-w-screen-lg min-h-screen px-6 mx-auto my-16'>
            <ProfileInfo/>
          </main>
          <Footer />
        </UserCtx>
      </>
    )
  } else {
    return <div></div>
  }


}