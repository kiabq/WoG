// Libraries
import { useState, FormEvent } from 'react';
import axios from 'axios';

// Context
import { getContext } from '@/context/usercontext';

// Types
import { IUser, OptionalQuestions, } from '@/utils/types';

type Options = {
    [index: string]: number
}

interface IProps {
    user: IUser
}

const INITIAL_STATE = {
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

    const questions = [
        [
            'I\'m very new to D&D and I\'ll likely need help learning the game as I\'m just getting started.',
            'I\'ve logged some time creating characters and playing through adventures and basically know the ropes.',
            'I\'m a D&D veteran who is experienced playing the game and know what I\'m doing.',
            'I know my way around the game both as a player and a GM, and have a thorough understanding of the rules.'
        ],
        'How do you feel about using game time to engage in grid combat during the game?',
        'How do you feel about using game time to explore immersive elements of the game?',
        'How do you feel about using game time for exploration of areas, dungeons, and game worlds in general?',
        'How do you feel about using game time to explore interactions between characters?',
        'How do you feel about using game time for downtime activities and resource development?',
        'How do you feel about using game time for character development of your own and other player characters?'
    ]

    function onCancel() {
        setOptional(user.optionalQuestions || INITIAL_STATE);
        setEditing(false);
    }

    console.log(optional);

    return (
        <div className='flex flex-col'>
            <h2 className='text-xl mx-auto pb-3'>Experience</h2>

            <form className='flex flex-col' onSubmit={async (e: FormEvent<HTMLFormElement>) => {
                e.preventDefault();

                const form = e.currentTarget as HTMLFormElement;
                let options: Options = {};

                for (let i = 0; i < form.length; i++) {
                    const formInput = form[i] as HTMLInputElement;
                    formInput.checked && (options[formInput.name] = parseInt(formInput.value))
                }

                await axios.put(`/api/user`, {
                    'optionalQuestions': options
                }).then((res) => {
                    if (res.status === 200) {
                        setAccount!(res.data);
                        setOptional(res.data.optionalQuestions);
                    }
                });

                setEditing(false);
            }}>
                {questions.map((element: string | Array<string>, index: number) => {
                    const key = Object.keys(optional).slice(index + 1, index + 2)[0];

                    if (Array.isArray(element)) {
                        return (
                            <section className='flex-col py-2 mx-auto' key={`${index}${key}`}>
                                <p className='pb-2 text-center text-left'>
                                    How experienced do you feel at playing Dungeons & Dragons?
                                </p>
                                {[1, 2, 3, 4].map((mapped: number, index: number) => {
                                    return (
                                        <div className='flex py-2' key={index}>
                                            <input type='radio'
                                                name={key}
                                                value={mapped}
                                                defaultChecked={optional[key as keyof OptionalQuestions] === mapped}
                                                onClick={(e) => {
                                                    setEditing(true);
                                                    setOptional({ ...optional, [key]: parseInt(e.currentTarget.value) })
                                                }}
                                                className='m-1'
                                            />
                                            <p>{element[index]}</p>
                                        </div>
                                    )
                                })}
                            </section>
                        )
                    }

                    return (
                        <section className='flex flex-col items-center text-left py-2' key={`${index}${key}`}>
                            <p className='w-4/5 pb-2'>{element}</p>
                            <div className='flex mx-auto text-sm'>
                                <span>Not Interested</span>
                                <div className='px-3'>
                                    {[1, 2, 3, 4, 5].map((mapped: number, index: number) => {
                                        return (
                                            <input type='radio'
                                                className='m-1'
                                                name={key}
                                                value={mapped}
                                                onClick={(e) => {
                                                    setEditing(true);
                                                    setOptional({ ...optional, [key]: parseInt(e.currentTarget.value) })
                                                }}
                                                checked={optional[key as keyof OptionalQuestions] === mapped}
                                            />
                                        )
                                    })}
                                </div>
                                <span>Interested</span>
                            </div>
                        </section>
                    )
                })}
                
                {editing && <div className='flex justify-center pt-5'>
                        <button type='submit' className='w-20 py-1 mr-1 text-slate-50 bg-blue-500 rounded-lg'>Save</button>
                        <button type='button' className='w-20 py-1 ml-1 text-blue-500 border-blue-500 border-2 rounded-lg' onClick={() => onCancel()}>Cancel</button>
                    </div>
                }
            </form>
        </div>
    )
}