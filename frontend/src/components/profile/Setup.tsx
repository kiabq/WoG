import { useState, useRef, FormEvent } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { getContext } from '@/context/usercontext';

// Types
import { Edit } from '@/utils/types';
import type { IUser } from '@/utils/types';

type UserInfo = {
  name: string,
  age: string,
  pronoun: string,
  invoice: string
}

interface IInfo {
  [field: string]: HTMLFormElement
}

export default function Setup() {
  const router = useRouter();
  const user: IUser = getContext();
  const [personal] = useState<UserInfo>(user.user_info);
  const [name, setName] = useState<string>((personal && personal.name) ?? '');
  const [age, setAge] = useState<string>((personal && personal.age) ?? '');
  const [pronoun, setPronoun] = useState<string>((personal && personal.pronoun) ?? '');
  const [invoice, setInvoice] = useState<string>((personal && personal.invoice) ?? '');
  const ref = useRef<HTMLSelectElement | null>(null);

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
    }).then(() => {
        router.push('/profile');
    });
  }

  return (
    <>
      <form className='flex flex-col md:w-1/3 mx-auto max-w-4/5 ' onSubmit={(e) => submit(e)}>
        <div className='mb-4'>
          <label htmlFor='name'>Name: </label>
          <input type='text'
            className='w-full p-1 ring-2 ring-gray-300 focus:ring-gray-600 hover:ring-gray-600' 
            id='name'
            value={name}
            onChange={(e) => { setName(e.currentTarget.value) }}
            required />
        </div>
        <div className='mb-4'>
          <label htmlFor='age'>Age: </label>
          <input type='number'
            className='w-full p-1 ring-2 ring-gray-300 focus:ring-gray-600 hover:ring-gray-600'
            id='age'
            value={age}
            min='18'
            max='80'
            onChange={(e) => { setAge(e.currentTarget.value) }}
            required />
        </div>
        <div className='mb-4'>
          <label htmlFor='invoice'>Invoice Email: </label>
          <input type='email'
            className='w-full p-1 ring-2 ring-gray-300 focus:ring-gray-600 hover:ring-gray-600'
            id='invoice'
            value={invoice}
            onChange={(e) => { setInvoice(e.currentTarget.value) }}
            required />
        </div>
        <div className='mb-4'>
          <label htmlFor='pronoun'>Pronouns:</label>
          <select name='pronouns'
            id='pronoun'
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

        <button type='submit' className='bg-blue-500 w-1/3 mx-auto p-2 rounded-lg font-medium text-neutral-100 focus:bg-blue-700 hover:bg-blue-700 '>
          Complete
        </button>
      </form>
    </>
  );
}