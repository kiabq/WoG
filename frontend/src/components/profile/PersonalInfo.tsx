import { FormEvent, useRef, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';

import { Edit } from '@/utils/types';

type LoaderArgs = {
    src: string
};

type UserInfo = {
    name: string,
    age: string,
    pronoun: string,
    invoice: string
}

interface IInfo {
    [field: string]: HTMLFormElement
}

export default function PersonalInfo({ user, edit, setEdit }: any) {
    const [personal, setPersonal] = useState<UserInfo>(user.user_info);
    const [name, setName] = useState<string>((personal && personal.name) ?? '');
    const [age, setAge] = useState<string>((personal && personal.age) ?? '');
    const [pronoun, setPronoun] = useState<string>((personal && personal.pronoun) ?? '');
    const [invoice, setInvoice] = useState<string>((personal && personal.invoice) ?? '');
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
            setPersonal(res.data)
        });
        
        setEdit(Edit.none);
    }

    return (
        <div className='flex flex-col items-center mb-16'>
            <Image
                loader={loader}
                src={`${user.avatar}.png`}
                alt='User&apos;s profile picture'
                width={128}
                height={128}
                className='rounded-full mb-4'
            />
            <form className='flex flex-col max-w-4/5' onSubmit={(e) => submit(e)}>
                <div className='pb-3'>
                    <label htmlFor='name' className='inline-block pb-1'>Name: </label>
                    <input type='text'
                        className='w-full border-2 border-slate-400 p-2 rounded-md'
                        id='name'
                        value={name}
                        onChange={(e) => { setName(e.currentTarget.value) }}
                        disabled={edit === Edit.none}
                        required />
                </div>
                <div className='pb-3'>
                    <label htmlFor='age' className='inline-block pb-1'>Age: </label>
                    <input type='number'
                        className='w-full border-2 border-slate-400 p-2 rounded-md'
                        id='age'
                        value={age}
                        min='18'
                        max='80'
                        onChange={(e) => { setAge(e.currentTarget.value) }}
                        disabled={edit === Edit.none}
                        required />
                </div>
                <div className='pb-3 whitespace-nowrap'>
                    <label htmlFor='pronoun' className='inline-block pb-1'>Pronouns:</label>
                    <select name='pronouns'
                        id='pronoun'
                        className='border-2 border-slate-400 bg-transparent inline-block p-2 ml-2 rounded-md'
                        disabled={edit === Edit.none}
                        value={pronoun}
                        onChange={(e) => { setPronoun(e.currentTarget.value) }}
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
                        onChange={(e) => { setInvoice(e.currentTarget.value) }}
                        disabled={edit === Edit.none}
                        required />
                </div>

                {edit === Edit.editing ?
                    <div>
                        <button type='submit'>
                            Submit
                        </button>

                        <button type='button' onClick={() => {
                            setEdit(Edit.none)
                            setName((personal && personal.name) ?? '');
                            setAge((personal && personal.age) ?? '');
                            setPronoun((personal && personal.pronoun) ?? '');
                        }} className='btn btn-padding cancel'>
                            Cancel
                        </button>
                    </div>
                    :
                    <button type='button' onClick={() => { setEdit(Edit.editing) }}>
                        Edit
                    </button>
                }
            </form>
        </div>
    )
}