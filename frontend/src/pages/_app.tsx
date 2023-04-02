// Libraries
import type { AppProps } from 'next/app'
import localFont from 'next/font/local';

// Styles
import '@/styles/globals.css'

const rubik = localFont({ src: '../fonts/rubik-variable.ttf' });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={rubik.className}>
      <Component {...pageProps}/>
    </main>
  );
}
