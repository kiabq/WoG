// Libraries
import Head from 'next/head';
import Cookies from 'cookies';
import { GetServerSideProps } from "next";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// Components
import Header from '@/components/header/Header';
import ProfileInfo from '@/components/profile/ProfileInfo';
import Footer from '@/components/footer/Footer';

// Context
import UserCtx from '@/context/usercontext';

// Utils
import { getUser } from '@/lib/getData';

// Types
import type { IUser } from '@/utils/types';

interface IProps {
  user: IUser
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const cookies = new Cookies(req, res);
  const token = cookies.get('token');
  const user = await getUser(token);

  return {
    props: { user }
  }
}

export default function Profile(props: IProps) {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (props.user.isNew) {
      router.push('/setup');
    }

    if (props.user === null) {
      router.push('/auth/logout');
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
          <main className='max-w-screen-lg px-6 mx-auto my-16'>
            <ProfileInfo />
          </main>
          <Footer />
        </UserCtx>
      </>
    )
  } else {
    return <div></div>
  }
}