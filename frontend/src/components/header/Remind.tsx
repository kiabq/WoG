// Libraries
import Link from 'next/link';

// Context
import { getContext } from '@/context/usercontext'

export default function Remind() {
    const user = getContext();

    if (user.isNew) {
        return (
            <div className='bg-red-600 text-slate-100 text-center'>
                <p>Your profile is incomplete. Click <Link href='/404' className='underline'>here</Link> to complete your profile.</p>
            </div>
        )
    } else {
        return null;
    }
}