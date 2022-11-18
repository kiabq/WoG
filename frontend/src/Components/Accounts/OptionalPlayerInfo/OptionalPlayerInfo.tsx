// Libraries
import React, { ReactElement, useEffect, useRef, useState } from "react";

// Components
import RadioBox from "./RadioBox";

// Styles
import st from "./OptionalPlayerInfo.module.css";

// Hooks
import { useAcct, triggerAccountUpdate } from "../../../hooks/useAccount";
import { useAuth } from "../../../hooks/useProvider";

// Types
import { Edit, EditFnProp, IndexType, OptionalQuestions, RequestCategory } from "../types";

// Utils
import { updateUserInformation } from "../../../utils/rest";

interface Props extends EditFnProp {
    editType: Edit
}

const INITIAL_STATE = {
    experience: 0,
    combat: 0,
    simulation: 0,
    exploration: 0,
    interactions: 0,
    resources: 0,
    character_development: 0
}

const OptionalPlayerInfo = ({ toggleEdit, editType }: Props) => {
    const auth = useAuth();
    const acct = useAcct();
    const [optional, setOptional] = useState<OptionalQuestions>(INITIAL_STATE);

    // Initialize state on component mount.
    useEffect(() => {
        if (acct.accountInfo.optional === null || typeof acct.accountInfo.optional === "undefined") {
            setOptional(INITIAL_STATE);
        } else {
            setOptional(acct.accountInfo.optional);
        }
    }, [acct.accountInfo.optional])

    // Handle form submit
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = e.currentTarget;
        let userFormData: IndexType<number> = {};

        for (let i = 0; i < form.length; i++) {
            if ((form[i] as HTMLInputElement).type === "radio") {
                let formElement = form[i] as HTMLInputElement;

                if (formElement.checked) {
                    userFormData[formElement.name] = parseInt(formElement.value);
                }
            }
        }

        if (auth !== null) {
            if (acct.accountInfo !== undefined && auth.token) {
                updateUserInformation(userFormData, auth.token, RequestCategory.optionalQuestions).then(
                    (res) => {triggerAccountUpdate(res, acct)}
                )
            }
        }

        toggleEdit(Edit.none);
    }

    const questions = [
        [
            "I'm very new to D&D and I'll likely need help learning the game as I'm just getting started.",
            "I've logged some time creating characters and playing through adventures and basically know the ropes.",
            "I'm a D&D veteran who is experienced playing the game and know what I'm doing.",
            "I know my way around the game both as a player and a GM, and have a thorough understanding of the rules."
        ],
        "How do you feel about using game time to engage in grid combat during the game?",
        "How do you feel about using game time to explore immersive elements of the game?",
        "How do you feel about using game time for exploration of areas, dungeons, and game worlds in general?",
        "How do you feel about using game time to explore interactions between characters?",
        "How do you feel about using game time for downtime activities and resource development?",
        "How do you feel about using game time for character development of your own and other player characters?"
    ]

    return (
        <form className={st.radio__form} onSubmit={(e) => {handleSubmit(e)}}>
            {questions.map((element: string | Array<string>, index: number) => {
                return (
                    <RadioBox value={index} optional={optional} editType={editType}>
                        <p>{element}</p>
                    </RadioBox>
                )
            })}

            {editType === Edit.optional &&
                <>
                    <button>
                        Submit
                    </button>

                    <button type="button" onClick={() => {toggleEdit(Edit.none)}}>
                        Cancel
                    </button>
                </>
            }

            {editType === Edit.none && 
                <button type="button" onClick={() => {toggleEdit(Edit.optional)}}>
                    Edit
                </button>
            }
        </form> 
    )
}

export default OptionalPlayerInfo;