// Libraries
import { useState, useRef, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

// Context
import { getContext } from '@/context/usercontext';

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
  const user = getContext();
  const [personal] = useState<UserInfo>(user.user.user_info);
  const [name, setName] = useState<string>((personal && personal.name) ?? '');
  const [age, setAge] = useState<string>((personal && personal.age) ?? '');
  const [pronoun, setPronoun] = useState<string>((personal && personal.pronoun) ?? '');
  const [invoice, setInvoice] = useState<string>((personal && personal.invoice) ?? '');
  const [submitted, setSubmitted] = useState(false);
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

    await axios.post(`/api/user`, {
      'user_info': user_info
    }).then(() => {
      setSubmitted(true);
    }).catch(() => { });
  }

  useEffect(() => {
    if (submitted) {
      router.reload();
    }
  }, [submitted])

  return (
    <>
      <div>
        <h1 className='mx-auto w-max my-5 text-2xl underline underline-offset-8 decoration-2'>Setup your profile</h1>
        <form className='flex flex-col md:w-1/3 mx-auto max-w-4/5 ' onSubmit={(e) => submit(e)}>
          <div className='mb-4'>
            <label htmlFor='name'>Name: </label>
            <input type='text'
              className='w-full border-2 border-slate-400 p-2 rounded-md'
              id='name'
              value={name}
              onChange={(e) => { setName(e.currentTarget.value) }}
              required />
          </div>
          <div className='mb-4'>
            <label htmlFor='age'>Age: </label>
            <input type='number'
              className='w-full border-2 border-slate-400 p-2 rounded-md'
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
              className='w-full border-2 border-slate-400 p-2 rounded-md'
              id='invoice'
              value={invoice}
              onChange={(e) => { setInvoice(e.currentTarget.value) }}
              required />
          </div>
          <div className='mb-4'>
            <label htmlFor='pronoun'>Pronouns:</label>
            <select name='pronouns'
              className='border-2 border-slate-400 bg-transparent inline-block p-2 ml-2 rounded-md'
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

          <button type='submit' className='bg-blue-500 w-1/3 mx-auto p-2 rounded-lg text-neutral-100 focus:bg-blue-700 hover:bg-blue-700'>
            Complete
          </button>
        </form>
      </div>
    </>
  );
}