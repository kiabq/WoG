import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Redirect() {
    const router = useRouter();

    useEffect(() => {
        router.push('/');
    }, [router]);

    return (
        <p>If you are not redirected within 5 seconds, click <Link href='/'>here</Link></p>
    );
}