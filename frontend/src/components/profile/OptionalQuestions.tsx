// Libraries
import { useState, FormEvent } from 'react';
import axios from 'axios';

// COmponents
import Submitter from '../UI/submitter';

// Context
import { getContext } from '@/context/usercontext';

// Types
import { IUser, OptionalQuestions, } from '@/utils/types';
import UserQuestions from '../UI/UserQuestions';

type Options = {
    [index: string]: number
}

interface IProps {
    user: IUser
}

export const INITIAL_STATE = {
    id: 0,
    experience: 0,
    combat: 0,
    simulation: 0,
    exploration: 0,
    interactions: 0,
    resources: 0,
    character_development: 0
}

export default function OptionalInfo({ user }: IProps) {
    const { setAccount } = getContext();
    const [optional, setOptional] = useState<OptionalQuestions>(user.optionalQuestions ?? INITIAL_STATE);
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    function onCancel() {
        setOptional(user.optionalQuestions || INITIAL_STATE);
        setEditing(false);
    }

    return (
        <div className='flex flex-col'>
            <h2 className='text-xl mx-auto pb-3'>Experience</h2>

            <form className='flex flex-col' onSubmit={async (e: FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                setLoading(true);

                const form = e.currentTarget as HTMLFormElement;
                let options: Options = {};

                for (let i = 0; i < form.length; i++) {
                    const formInput = form[i] as HTMLInputElement;
                    formInput.checked && (options[formInput.name] = parseInt(formInput.value));
                }


                await axios.put(`/api/user`, {
                    'optionalQuestions': options
                }).then((res) => {
                    if (res.status === 200) {
                        setAccount!({ ...res.data, role: user.role });
                        setOptional(res.data.optionalQuestions);
                    }
                });

                setEditing(false);
                setLoading(false);
            }}>
                <UserQuestions optional={optional} readonly={false} setEditing={setEditing} setOptional={setOptional}/>
                <Submitter editing={editing} loading={loading} onCancel={onCancel} />
            </form>
        </div>
    )
}