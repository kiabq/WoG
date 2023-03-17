// Libraries
import Link from 'next/link';
import Image from 'next/image';

// Fonts
import localFont from 'next/font/local';
import { useEffect } from 'react';
const rubik = localFont({ src: '../../fonts/rubik-variable.ttf' })

type HeaderProps = {
  user: any
}

type LoaderArgs = {
  src: string
}

export default function Header(props: HeaderProps) {
  const { user } = props;

  const loader = ({ src }: LoaderArgs) => {
    return `https://cdn.discordapp.com/avatars/${user.providerId}/${src}`
  }

  return (
    <header className={`${rubik.className} max-w-screen-lg mx-auto text-lg pb-3 border-b-2`}>
      <nav className='flex items-center pt-4'>
        <span className='grow'>
          <Link href='/'>World of Gaian</Link>
        </span>
        <Link href='/#about' className='pr-3'>About</Link>
        <Link href='/#dungeon-masters' className='pr-3'>Dungeon Masters</Link>
        {!user.username && <Link href={`http://${process.env.REACT_APP_BACKEND}/api/connect/discord`}>Sign In With Discord</Link>}
        {user.username &&
          <div className=' border-2 rounded-lg'>
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
      </nav>
    </header>
  )
}