// Libraries
import React, { ReactElement, useRef } from "react";

// Types
import { Edit, OptionalQuestions } from "../types";

interface Props {
    children: any,
    value: number,
    optional: OptionalQuestions,
    editType: Edit
}

function fillRef(amount: number, ref: React.MutableRefObject<HTMLInputElement[]>, value: number, optional: OptionalQuestions, editType: Edit) {
    let temp = [];

    for (let i = 0; i < amount; i++) {
        temp.push(
            <input type="radio"
                value={i + 1}
                // Temporary name, programmatically replaced on line 36.
                name={`option${value}`}
                ref={(element: HTMLInputElement) => (ref.current[i] = element)}
                disabled={editType !== Edit.optional}
            />
        )
    }

    if (optional && ref.current) {
        const optionalValues = Object.values(optional).slice(1);
        const optionalKeys = Object.keys(optional).slice(1);
        const currentRef = ref.current[optionalValues[value] - 1];

        for (let i = 0; i < amount; i++) {
            if (typeof ref.current[i] !== "undefined") {
                ref.current[i].name = optionalKeys[value];
            }
        }

        if (currentRef !== undefined) {
            currentRef.checked = true;
        }
    }

    return temp;
}

const RadioBox = ({ children, value, optional, editType }: Props) => {
    const ref = useRef<Array<HTMLInputElement>>([]);

    if (typeof children.props.children === "string") {
        return (
            <div>
                <p>{children.props.children}</p>
                {fillRef(5, ref, value, optional, editType).map((element: ReactElement) => {
                    return (
                        <>
                            {element}
                        </>
                    )
                })}
            </div>
        )
    } else if (Array.isArray(children.props.children)) {
        let length = children.props.children.length;
        
        return (
            <div>
                {fillRef(length, ref, value, optional, editType).map((element: ReactElement, index: number) => {
                    return (
                        <div>
                            <p>{children.props.children[index]}</p>
                            {element}
                        </div>
                    )
                })}
            </div>
        ) 
    }

    return (
        <div>
            <p>Loading...</p>
        </div>
    )
}

export default RadioBox;