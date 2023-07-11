// Libraries
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface IRedirect {
    page: string
}

export default function Redirect({ page }: IRedirect) {
    const router = useRouter();

    useEffect(() => {
        page && router.push(page.toString());
    }, [router]);

    return (
        <div className='w-screen h-screen flex'>
            <p className='w-3/4 text-center h-max m-auto'>If you are not redirected within 5 seconds, click <Link href={page ?? '/'} className='underline'>here</Link></p>
        </div>
    );
}