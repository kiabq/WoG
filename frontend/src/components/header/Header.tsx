// Libraries
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

// Context
import { getContext } from '@/context/usercontext';

// Fonts
import localFont from 'next/font/local';
import { useEffect } from 'react';
const rubik = localFont({ src: '../../fonts/rubik-variable.ttf' })

type LoaderArgs = {
  src: string
}

export default function Header() {
  const [isOpened, setIsOpened] = useState(false);
  const user = getContext();

  const loader = ({ src }: LoaderArgs) => {
    return `https://cdn.discordapp.com/avatars/${user.providerId}/${src}`
  }

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) {
        setIsOpened(false);
      }
    }

    window.addEventListener('resize', handleResize);

    return (
      window.addEventListener('resize', handleResize)
    );
  }, [])

  return (
    <header className={`${rubik.className} max-w-screen-lg mx-auto text-lg pb-3 border-b-2`}>
      <nav className='flex items-center pt-4'>
        <span className='grow'>
          <Link href='/' className='ml-3 md:ml-0'>World of Gaian</Link>
        </span>

        <Link href='/#about' className='pr-3 hidden md:block'>About</Link>
        <Link href='/#dungeon-masters' className='pr-3 hidden md:block'>Dungeon Masters</Link>
        {!user.username && <Link href={`http://${process.env.REACT_APP_BACKEND}/api/connect/discord`} className='hidden md:block'>Sign In With Discord</Link>}
        {user &&
          <div className='border-2 rounded-lg mr-3 hidden md:block hover:border-[#738adb]'>
            <Link href='/profile' className=' flex flex-row items-center'>
              <Image
                loader={loader}
                src={`${user.avatar}.png`}
                alt='User&apos;s profile picture'
                width={32}
                height={32}
                className='rounded-l-md'
              />
              <p className='px-1'>{user.username}</p>
            </Link>
          </div>
        }
        {user && <Link href='/auth/logout' className='hidden md:block'>Sign Out</Link>}
        <div>
          <button className='relative group md:hidden' onClick={() => setIsOpened(!isOpened)}>
            <div className='relative flex overflow-hidden items-center justify-center w-[50px] h-[50px] transform ring-0 duration-200'>
              <div className='flex flex-col justify-between w-[20px] h-[20px] transform duration-300 origin-center overflow-hidden'>
                {!isOpened && <>
                  <div className='bg-black h-[2px] w-7 transform duration-300 origin-left delay-100'></div>
                  <div className='bg-black h-[2px] w-7 rounded transform duration-300 delay-75'></div>
                  <div className='bg-black h-[2px] w-7 transform duration-300 origin-left'></div>
                </>}

                {isOpened &&
                  <div className='absolute items-center justify-between transform duration-500 top-2.5 -translate-x-10 translate-x-0 flex w-0 w-12'>
                    <div className='absolute bg-black h-[2px] w-5 transform duration-500 rotate-0 delay-300 rotate-45'></div>
                    <div className='absolute bg-black h-[2px] w-5 transform duration-500 -rotate-0 delay-300 -rotate-45'></div>
                  </div>
                }
              </div>
            </div>
          </button>
        </div>
      </nav>
      {isOpened &&
        <div className='flex flex-col text-left'>
          <div className='mx-auto flex flex-col'>
            {!user && <Link href={`http://${process.env.REACT_APP_BACKEND}/api/connect/discord`}>Sign In With Discord</Link>}
            {user && <Link href='/profile'>Profile</Link>}
            <Link href='/#about' className='pr-3'>About</Link>
            <Link href='/#dungeon-masters' className='pr-3'>Dungeon Masters</Link>
            {user && <Link href='/auth/logout' className='pr-3'>Sign Out</Link>}
          </div>

        </div>
      }
    </header>
  )
}