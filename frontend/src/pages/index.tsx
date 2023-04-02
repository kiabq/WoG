// Libraries
import Head from 'next/head';
import Image from 'next/image';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'cookies';

// Components
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import Schedule from '@/components/schedule/Schedule';
import { createImportSpecifier } from 'typescript';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const cookies = new Cookies(req, res);
  const token = cookies.get('token');

  const user = await axios.get(`http://${process.env.REACT_APP_BACKEND}/api/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((res) => {
    if (res.status === 200) {
      console.log(res.data);
      return res.data;
    }
  }).catch(() => { return '' })

  const dm = await axios.get(`http://${process.env.REACT_APP_BACKEND}/api/dungeon-masters?populate=attributes
    &populate[1]=sunday.times
    &populate[2]=monday.times
    &populate[3]=tuesday.times
    &populate[4]=wednesday.times
    &populate[5]=thursday.times
    &populate[6]=friday.times
    &populate[7]=saturday.times`)
    .then(
      (res) => {
        return res.data.data;
      }
    )

  return {
    props: {
      user,
      dm
    }
  }
}

// add type :p
export default function Home(props: any) {
  return (
    <>
      <Head>
        <title>World of Gaian</title>
      </Head>
      <Header user={props.user}/>
      <main className='max-w-screen-lg min-h-screen mx-auto'>
        <div className='mx-auto w-11/12 my-16 text-center'>
          <h1 className='text-3xl pb-2 md:text-4xl'>Find the perfect group to play Dungeons and Dragons with.</h1>
          <h3 className='text-lg'>In the World of Gaian, you&apos;ll be matched with the right  dungeon master and other players for a game that fits your style and interests.</h3>
          <Image src='/assets/camp.png'
            width={512}
            height={512}
            alt='Backpack and campfire'
            className='mx-auto'
          />
        </div>
        <div className='mx-auto w-11/12 my-16 text-center'>
          <h1 className='text-4xl' id='dungeon-masters'>Dungeon Masters & Game Times</h1>
          <label htmlFor='dms'>Select Dungeon Master:</label>
          <Schedule dm={props.dm} />
        </div>
        <div className='mx-auto w-11/12 my-16 text-center'>
          <h1 className='text-4xl' id='about'>About</h1>
          <section className='flex flex-col pb-16 md:flex-row'>
            <Image src={'/assets/dryad.png'} width={384} height={384} alt='Dryad and squirrel' className='w-auto h-auto' />
            <div className='my-auto'>
              <h3 className='text-2xl'>Find your perfect gaming group.</h3>
              <p>Get ready to embark on an epic adventure! With World of Gaian, you can find the perfect gaming group for you. Tell us a little bit about yourself and we’ll match you with a group or dungeon master that fits your needs. Ready to join the quest? Get started today!</p>
            </div>
          </section>
          <section className='flex flex-col-reverse pb-16 md:flex-row'>
            <div className='my-auto'>
              <h3 className='text-2xl'>Unite with other plays for an unforgettable adventure</h3>
              <p>Experience the thrill of a classic Dungeons and Dragons tabletop game with a group of friends or dungeon master. World of Gaian provides you with the tools to connect with players from all around the world, and embark on an epic journey to discover new realms, solve puzzles, and battle monsters.</p>
            </div>
            <Image src='/assets/guard.png' width={384} height={384} alt='Goblin guard sitting on duty' className='w-auto h-auto' />
          </section>
          <section className='flex flex-col md:flex-row'>
            <Image src='/assets/treasure.png' width={384} height={384} alt='Treasure chest sitting unopened' className='w-auto h-auto' />
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