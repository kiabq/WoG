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
        <p>If you are not redirected within 5 seconds, click <Link href={page ?? '/'}>here</Link></p>
    );
}