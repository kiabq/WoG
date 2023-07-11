// Libraries
import { FormEvent, useRef, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';

// Types
import { IUser } from '@/utils/types';

type LoaderArgs = {
    src: string
};

type UserInfo = {
    name: string,
    age: string,
    pronoun: string,
    invoice: string
}

interface IProps {
    user: IUser
}

interface IInfo {
    [field: string]: HTMLFormElement
}

export default function PersonalInfo({ user }: IProps) {
    const [personal, setPersonal] = useState<UserInfo>(user.user_info);

    // fix: initial state not being set correctly after setup
    const INITIAL_STATE = {
        name: personal !== null ? personal.name : '',
        age: personal !== null ? personal.age : '',
        pronoun: personal !== null ? personal.pronoun : '',
        invoice: personal !== null ? personal.invoice : ''
    }

    const [name, setName] = useState<string>((personal && personal.name) ?? '');
    const [age, setAge] = useState<string>((personal && personal.age) ?? '');
    const [pronoun, setPronoun] = useState<string>((personal && personal.pronoun) ?? '');
    const [invoice, setInvoice] = useState<string>((personal && personal.invoice) ?? '');
    const [editing, setEditing] = useState(false);
    const ref = useRef<HTMLSelectElement | null>(null);

    const loader = ({ src }: LoaderArgs) => {
        return `https://cdn.discordapp.com/avatars/${user.providerId}/${src}`
    }

    async function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const target: IInfo = e.currentTarget;
        const user_info = {
            name: (target['name'].value) as string,
            age: (target['age'].value) as string,
            pronoun: (target['pronoun'].value) as string,
            invoice: (target['invoice'].value) as string
        }

        await axios.put(`/api/user`, {
            'user_info': user_info
        }).then((res) => {
            setPersonal(res.data.user_info);
        });
        
        setEditing(false);
    }

    function onCancel() {
        setName(INITIAL_STATE.name);
        setAge(INITIAL_STATE.age);
        setPronoun(INITIAL_STATE.pronoun);
        setInvoice(INITIAL_STATE.invoice);
        setEditing(false);
    }

    return (
        <div className='flex flex-col items-center mb-16 lg:mb-0'>
            <h2 className='text-xl pb-3'>Personal</h2>
            <Image
                loader={loader}
                src={`${user.avatar}.png`}
                alt='User&apos;s profile picture'
                width={128}
                height={128}
                className='rounded-full mb-4 border-2 border-black'
            />
            {/* note: margin here really sucks, change in future. */}
            <form className='flex flex-col max-w-4/5 lg:mb-6' onSubmit={(e) => submit(e)}>
                <div className='pb-3'>
                    <label htmlFor='name' className='inline-block pb-1'>Name:</label>
                    <input type='text'
                        className='w-full border-2 border-slate-400 p-2 rounded-md'
                        id='name'
                        value={name}
                        onChange={(e) => { 
                            setName(e.currentTarget.value);
                            setEditing(true);
                        }}
                        required />
                </div>
                <div className='pb-3'>
                    <label htmlFor='age' className='inline-block pb-1'>Age:</label>
                    <input type='number'
                        className='w-full border-2 border-slate-400 p-2 rounded-md'
                        id='age'
                        value={age}
                        min='18'
                        max='80'
                        onChange={(e) => { 
                            setAge(e.currentTarget.value);
                            setEditing(true);
                        }}
                        required />
                </div>
                <div className='pb-3 whitespace-nowrap'>
                    <label htmlFor='pronoun' className='inline-block pb-1'>Pronouns:</label>
                    <select name='pronouns'
                        id='pronoun'
                        className='border-2 border-slate-400 bg-transparent inline-block p-2 ml-2 rounded-md'
                        value={pronoun}
                        onChange={(e) => { 
                            setPronoun(e.currentTarget.value);
                            setEditing(true);
                        }}
                        ref={ref}>
                        <option value='' disabled hidden>
                            Select pronouns
                        </option>
                        <option value='He/Him'>He/Him</option>
                        <option value='She/Her'>She/Her</option>
                        <option value='They/Them'>They/Them</option>
                        <option value='Other'>Other</option>
                        <option value='None'>None</option>
                    </select>
                </div>
                <div className='pb-3'>
                    <label htmlFor='invoice' className='inline-block pb-1'>Invoice Email: </label>
                    <input type='email'
                        className='w-full border-2 border-slate-400 p-2 rounded-md'
                        id='invoice'
                        value={invoice}
                        onChange={(e) => { 
                            setInvoice(e.currentTarget.value);
                            setEditing(true);
                        }}
                        required />
                </div>
                {editing && <div className='flex justify-center pt-[1.5rem] md:pt-0 mt-auto'>
                        <button type='submit' className='w-20 py-1 mr-1 text-slate-50 bg-blue-500 rounded-lg'>Save</button>
                        <button type='button' className='w-20 py-1 ml-1 text-blue-500 border-blue-500 border-2 rounded-lg' onClick={() => onCancel()}>Cancel</button>
                    </div>
                }
            </form>

        </div>
    )
}