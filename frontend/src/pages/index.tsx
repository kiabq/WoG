// Libraries
import Head from 'next/head';
import Image from 'next/image';
import Cookies from 'cookies';
import { GetServerSideProps } from 'next';
import axios from 'axios';

// Components
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';

// Fonts
import localFont from 'next/font/local';

const rubik = localFont({ src: '../fonts/rubik-variable.ttf' });

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
    .catch(() => { return '' })

  return {
    props: { user }
  }
}

export default function Home(props: any) {
  const { username } = props.user;

  return (
    <>
      <Head>
        <title>World of Gaian</title>
      </Head>
      <Header username={username} />
      <main className={`${rubik.className} max-w-screen-lg mx-auto`}>
        <div className='mx-auto w-4/5 my-16 text-center'>
          <h1 className='text-4xl pb-2'>Find the perfect group to play Dungeons and Dragons with.</h1>
          <h3 className='text-lg'>In the World of Gaian, you&apos;ll be matched with the right  dungeon master and other players for a game that fits your style and interests.</h3>
          <Image src={'/assets/camp.png'}
            width={512}
            height={512}
            alt='Backpack and campfire'
            className='mx-auto'
          />
        </div>
        <div className='mx-auto w-4/5 my-16 text-center'>
          <h1 className='text-4xl' id='dungeon-masters'>Dungeon Masters</h1>
          <label htmlFor='dms'>Select Dungeon Master:</label>
          <select name='dungeon-master' id='dms'>
            <option value=''>None Selected</option>
          </select>
        </div>
        <div className='mx-auto w-4/5 my-16 text-center'>
          <h1 className='text-4xl' id='about'>About</h1>
          <section className='flex'>
            <Image src={'/assets/dryad.png'} width={384} height={384} alt='Dryad and squirrel' />
            <div className='my-auto'>
              <h3 className='text-2xl'>Find your perfect gaming group.</h3>
              <p>Get ready to embark on an epic adventure! With World of Gaian, you can find the perfect gaming group for you. Tell us a little bit about yourself and we’ll match you with a group or dungeon master that fits your needs. Ready to join the quest? Get started today!</p>
            </div>
          </section>
          <section className='flex'>
            <div className='my-auto'>
              <h3 className='text-2xl'>Unite with other plays for an unforgettable adventure</h3>
              <p>Experience the thrill of a classic Dungeons and Dragons tabletop game with a group of friends or dungeon master. World of Gaian provides you with the tools to connect with players from all around the world, and embark on an epic journey to discover new realms, solve puzzles, and battle monsters.</p>
            </div>
            <Image src={'/assets/guard.png'} width={384} height={384} alt='Goblin guard sitting on duty' />
          </section>
          <section className='flex'>
            <Image src={'/assets/treasure.png'} width={384} height={384} alt='Treasure chest sitting unopened' />
            <div className='my-auto'>
              <h3 className='text-2xl'>Play as much as you want without breaking the bank.</h3>
              <p>Never worry about breaking the bank with our pay-as-you-play model. Only pay for each game you&apos;re in and each session, so you can play as much or as little Dungeons & Dragons as you want</p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}