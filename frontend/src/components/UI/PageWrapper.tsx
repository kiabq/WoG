// Libraries
import Head from 'next/head';

// Components
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';

// Context
import UserCtx from '@/context/usercontext';

// Types
import type { IUser } from '@/utils/types';

interface IPageProps {
    title: string,
    user: IUser,
    children: JSX.Element,
    classes?: string
}

export const PageWrapper = ({ title, user, children, classes }: IPageProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <UserCtx user={user}>
        <Header/>
          <main className={`max-w-screen-lg px-6 mx-auto my-16 ${classes}`}>
            {children}
          </main>
        <Footer />
      </UserCtx>
    </>
  )
}