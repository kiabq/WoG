// Libraries
import React, { ReactElement, useRef } from "react";

// Styles
import st from "./OptionalPlayerInfo.module.css";

// Types
import { Edit, OptionalQuestions } from "../../../utils/types";

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
            <div className={`${st.radio__form__element}`}>
                <p>{children.props.children}</p>
                <div className={st.temp}>
                    <span className="ub_lgt">Not Interested</span>
                    <div className={st.radio__form__input}>
                        {fillRef(5, ref, value, optional, editType).map((element: ReactElement) => {
                            return (
                                <>
                                    {element}
                                </>
                            )
                        })}
                    </div>
                    <span className="ub_lgt">Interested</span>
                </div>
            </div>
        )
    }
    
    if (Array.isArray(children.props.children)) {
        const length = children.props.children.length;

        return (
            <div className={st.radio__form__element}>
                {fillRef(length, ref, value, optional, editType).map((element: ReactElement, index: number) => {
                    return (
                        <div style={{
                            display: "flex", 
                            flexDirection: "row", 
                            paddingTop: "10px", 
                            paddingBottom: "10px"
                            }}>
                            {element}
                            <p>{children.props.children[index]}</p>
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