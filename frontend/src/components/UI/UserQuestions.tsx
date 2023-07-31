// Components
import { INITIAL_STATE } from "../profile/OptionalQuestions";

// Types
import type { Dispatch, SetStateAction } from "react";
import type { OptionalQuestions } from "@/utils/types";

type Editing = Dispatch<SetStateAction<boolean>>;
type Optional = Dispatch<SetStateAction<OptionalQuestions>>;

interface IQuestionProps {
    optional: OptionalQuestions,
    readonly: boolean,
    setEditing?: Editing,
    setOptional?: Optional
}

export default function UserQuestions({ optional, readonly, setEditing, setOptional }: IQuestionProps) {
    if (optional === null) {
        optional = INITIAL_STATE;
    }
    
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
    ];

    return (
        <>
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
                                            className='m-1'
                                            name={key}
                                            value={mapped}
                                            onClick={(e) => {
                                                if (!readonly) {
                                                    setEditing!(true);
                                                    setOptional!({ ...optional, [key]: parseInt(e.currentTarget.value) })
                                                }
                                            }}
                                            disabled={readonly}
                                            checked={optional[key as keyof OptionalQuestions] === mapped}
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
                                                if (!readonly) {
                                                    setEditing!(true);
                                                    setOptional!({ ...optional, [key]: parseInt(e.currentTarget.value) })    
                                                }
                                            }}
                                            disabled={readonly}
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
        </>
    )
}