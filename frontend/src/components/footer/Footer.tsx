// Libraries
import Link from "next/link"

export default function Footer() {
    return (
        <footer className='max-w-screen-lg mx-auto flex flex-col h-auto pt-12 text-black items-center border-t-2 md:text-gray-400'>
            <div className='flex pb-6'>
                <section className='flex flex-col w-36 px-6'>
                    <h2 className='pb-2 text-black'>Socials</h2>
                    <a href='https://www.youtube.com/channel/UCweMqNxb5iCbiM8s_YNPjUg' target='_blank' className='hover:text-black'>Youtube</a>
                    <a href='https://www.twitch.tv/dm_ravenx' target='_blank' className='hover:text-black'>Twitch</a>
                </section>
                <section className='px-6'>
                    <h2 className='pb-2 text-black'>Other</h2>
                    <Link href='/privacy' className='hover:text-black'>
                        Privacy Policy
                    </Link>
                </section>
            </div>
            <p className='text-black'>&#169; 2023 - World of Gaian</p>
        </footer>
    )
}