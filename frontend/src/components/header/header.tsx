// Libraries
import Link from 'next/link';

// Fonts
import localFont from 'next/font/local';
import { useEffect } from 'react';
const rubik = localFont({ src: '../../fonts/rubik-variable.ttf' })

type HeaderProps = {
  username: string | null
}
export default function Header(props: HeaderProps) {
  return (
    <header className={`${rubik.className} max-w-screen-lg mx-auto text-lg `}>
      <nav className='flex pt-4 '>
        <span className='grow'>
          <Link href='/'>World of Gaian</Link>
        </span>
        <Link href='#about' className='pr-3'>About</Link>
        <Link href='#dungeon-masters' className='pr-3'>Dungeon Masters</Link>
        {!props.username && <Link href={`http://${process.env.REACT_APP_BACKEND}/api/connect/discord`}>Sign In With Discord</Link>}
        {props.username &&
          <div className='flex flex-col'>
            <Link href='/profile'>{props.username}</Link>
            <Link href='/auth/logout'>Logout</Link>
          </div>
        }
      </nav>
    </header>
  )
}