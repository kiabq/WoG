// Libraries
import Head from 'next/head';
import { GetServerSideProps } from "next";
import Cookies from "cookies";
import axios from "axios";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const cookies = new Cookies(req, res);
  const token = cookies.get('token');

  const user = await axios.get(`http://${process.env.REACT_APP_BACKEND}/api/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => {
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
      <main>
        {props.user.username}
      </main>
    </>
  )
}