// Libraries
import React, { ReactElement, useRef } from 'react';
import { Edit, OptionalQuestions } from '@/utils/types';

interface Props {
    children: any,
    value: number,
    optional: OptionalQuestions,
    editType: Edit
}

function fillRef(amount: number, ref: React.MutableRefObject<HTMLInputElement[]>, value: number, optional: OptionalQuestions, editType: Edit) {
    let temp = [];

    if (optional && ref.current) {
        const optionalValues = Object.values(optional).slice(1);
        const optionalKeys = Object.keys(optional).slice(1);
        const currentRef = ref.current[optionalValues[value] - 1];

        for (let i = 0; i < amount; i++) {
            if (typeof ref.current[i] !== 'undefined') {
                ref.current[i].name = optionalKeys[value];
            }
        }

        if (currentRef !== undefined) {
            currentRef.checked = true;
        }

    }

    for (let i = 0; i < amount; i++) {
        temp.push(
            <input type='radio'
                value={i + 1}
                ref={(element: HTMLInputElement) => (ref.current[i] = element)}
                disabled={editType !== Edit.optional}
            />
        )
    }

    return temp;
}

export default function RadioBox({ children, value, optional, editType }: Props) {
    const ref = useRef<Array<HTMLInputElement>>([]);

    if (typeof children.props.children === 'string') {
        return (
            <section>
                <h5>{children.props.children}</h5>
                <div>
                    <span className='ub_lgt'>Not Interested</span>
                    <div>
                        {fillRef(5, ref, value, optional, editType).map((element: ReactElement) => {
                            return (
                                <>
                                    {element}
                                </>
                            )
                        })}
                    </div>
                    <span className='ub_lgt'>Interested</span>
                </div>
            </section>
        )
    }

    if (Array.isArray(children.props.children)) {
        const length = children.props.children.length;

        return (
            <section>
                <h5>Which of these best describes you?</h5>
                {fillRef(length, ref, value, optional, editType).map((element: ReactElement, index: number) => {
                    return (
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            paddingTop: '10px',
                            paddingBottom: '10px'
                        }}>
                            {element}
                            <p>{children.props.children[index]}</p>
                        </div>
                    )
                })}
            </section>
        )
    }

    return (
        <div>
            <p>Loading...</p>
        </div>
    )
}