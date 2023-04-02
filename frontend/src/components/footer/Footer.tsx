// Libraries
import Link from "next/link"

export default function Footer() {
    return (
        <footer className='flex flex-col w-screen h-96 pt-12 bg-slate-600 text-gray-100 items-center md:text-gray-400'>
            <div className='flex pb-6'>
                <section className='flex flex-col w-36 px-6'>
                    <h2 className='pb-2 text-gray-100'>Socials</h2>
                    <a href='' className='hover:text-gray-100'>Discord</a>
                    <a href='' className='hover:text-gray-100'>Twitter</a>
                    <a href='https://www.twitch.com' className='hover:text-gray-100'>Twitch</a>
                </section>
                <section className='px-6'>
                    <h2 className='pb-2 text-gray-100'>Other</h2>
                    <Link href='/privacy-policy' className='hover:text-gray-100'>
                        Privacy Policy
                    </Link>
                </section>
            </div>
            <p className='text-gray-100'>&#169; 2023 - World of Gaian</p>
        </footer>
    )
}