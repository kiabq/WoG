import { useState, useRef, FormEvent } from 'react';
import axios from 'axios';

import { Edit, OptionalQuestions, } from '@/utils/types';

type Options = {
    [index: string]: number
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

export default function OptionalInfo({ user, edit, setEdit }: any) {
    const [optional, setOptional] = useState<OptionalQuestions>(user.optionalQuestions ?? INITIAL_STATE);
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

    return (
        <div className='flex flex-col'>
            <h2 className='pb-3 mx-auto'>Questions</h2>

            <form className='flex flex-col' onSubmit={async (e: FormEvent<HTMLFormElement>) => {
                e.preventDefault();

                const form = e.currentTarget as HTMLFormElement;
                let options: Options = {};

                for (let i = 0; i < form.length; i++) {
                    const formInput = form[i] as HTMLInputElement;

                    formInput.checked && (options[formInput.name] = parseInt(formInput.value))
                }

                await axios.put(`${process.env.REACT_APP_FRONTEND}/api/user`, {
                    'optionalQuestions': options
                }).then((res) => {
                    if (res.status === 200) {
                        setOptional(res.data);
                    }
                });

                setEdit(Edit.none);
            }}>
                {questions.map((element: string | Array<string>, index: number) => {
                    const ref = useRef<HTMLInputElement | null>(null);
                    const key = Object.keys(optional).slice(index + 1, index + 2)[0];
                    const value = Object.values(optional).slice(index + 1, index + 2)[0];

                    if (ref.current) {
                        ref.current.checked = true;
                    }

                    if (Array.isArray(element)) {
                        return (
                            <section className='flex-col py-2' key={`${index}${key}`}>
                                <p className='pb-2 text-center text-left'>
                                    How experienced do you feel at playing Dungeons & Dragons?
                                </p>
                                {[1, 2, 3, 4].map((mapped: number, index: number) => {
                                    return (
                                        <div className='flex' key={index}>
                                            <input type='radio'
                                                name={key}
                                                value={mapped}
                                                defaultChecked={mapped === value}
                                                disabled={edit !== Edit.editing}
                                                ref={mapped === value ? ref : null}
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
                                                name={key}
                                                value={mapped}
                                                defaultChecked={mapped === value}
                                                disabled={edit !== Edit.editing}
                                                ref={mapped === value ? ref : null}
                                                key={index}
                                            />
                                        )
                                    })}
                                </div>
                                <span>Interested</span>
                            </div>
                        </section>
                    )
                })}

                {edit === Edit.editing ?
                    <div className='mx-auto'>
                        <button type='submit' onClick={() => {
                            setOptional(optional);
                        }}>
                            Submit
                        </button>

                        <button type='button' onClick={() => {
                            setEdit(Edit.none)
                            setOptional(optional)
                        }}>
                            Cancel
                        </button>
                    </div>
                    :
                    <button type='button' onClick={() => { setEdit(Edit.editing) }} className='mx-auto'>
                        Edit
                    </button>
                }
            </form>
        </div>
    )
}