// Libraries
import Head from 'next/head';
import { GetServerSideProps } from "next";
import Cookies from 'cookies';
import axios from 'axios';
import { useState } from 'react';

// Components
import Header from '@/components/header/Header';
import ProfileInfo from '@/components/profile/ProfileInfo';
import Footer from '@/components/footer/Footer';

// Types
import { Edit } from '@/utils/types';

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
  })

  return {
    props: { user }
  }
}

export default function Profile(props: any) {
  return (
    <>
      <Head>
        <title>World of Gaian - Profile</title>
      </Head>
      <Header user={props.user} />
      <main className='max-w-screen-lg min-h-screen px-6 mx-auto my-16'>
        <ProfileInfo user={props.user} />
      </main>
      <Footer />
    </>
  )
}