// Libraries
import type { AppProps } from 'next/app'
import localFont from 'next/font/local';
import { useRouter } from 'next/router';

// Styles
import '@/styles/globals.css'

const rubik = localFont({ src: '../fonts/rubik-variable.ttf' });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={rubik.className}>
      <Component {...pageProps}/>
    </div>
  );
}
