// Libraries
import React from "react";

// Styles
import styles from "./PlayerInfo.module.css";

// Hooks
import { useAuth } from "../../../hooks/useProvider";
import { useAcct, triggerAccountUpdate } from "../../../hooks/useAccount";

// Types
import { Edit, EditFnProp, RequestCategory, IndexType } from "../types";

// Utils
import { updateUserInformation } from "../../../utils/rest";

const PlayerInfoForm = ({ toggleEdit }: EditFnProp) => {
    const auth = useAuth();
    const acct = useAcct();

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        
        const form = e.currentTarget;

        let userFormData: IndexType<string> = {};

        for (let i = 0; i < 4; i++) {
            const formElement = form[i] as HTMLInputElement;

            if (formElement.value !== "" || null) {
                userFormData[formElement.name] = formElement.value;
            }
        }

        if (auth !== null) {
            if (acct.accountInfo !== undefined && auth.token) {
                updateUserInformation(userFormData, auth.token, RequestCategory.user_info).then(
                    (res) => {triggerAccountUpdate(res, acct)}
                )
            }
        }

        toggleEdit(Edit.none)
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)} className={styles.playerinfo}>
            <div className="flex_col">
                <div className="flex-col pd3-top">
                    <label htmlFor="name" className="ub_lgt">Name*:</label>
                    <input type="text"
                        name="name" 
                        placeholder="Enter Name"
                        defaultValue={acct.accountInfo.user_info?.name}
                        required={true}
                    />
                </div>

                <div className="flex-col pd3-top">
                    <label htmlFor="invoiceEmail" className="ub_lgt">Invoice Email:</label>
                    <input type="email"
                        name="invoiceEmail" 
                        placeholder="Enter Email" 
                        className={styles.playerinfo__text__input}
                        defaultValue={acct.accountInfo.user_info?.invoiceEmail}
                        required={true}
                    />
                </div>

                <div className="flex-col pd3-top">
                    <label htmlFor="pronoun" className="ub_lgt">Pronoun:</label>
                    <select name="pronoun" defaultValue={(acct.accountInfo.user_info?.pronoun)}>
                        <option value="None">None</option>
                        <option value="He/Him">He/Him</option>
                        <option value="She/Her">She/Her</option>
                        <option value="They/Them">They/Them</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="flex-col pd3-top">
                    <label htmlFor="age" className="ub_lgt">Age:</label>
                    <input name="age" type="number" min="18" max="99" defaultValue={acct.accountInfo.user_info?.age}/>
                </div>

                <div className={styles.playerinfo__form__controls}>
                    <input type="submit" value="Submit" className="btn btn-padding submit"/>
                    <button onClick={() => toggleEdit(Edit.none)} 
                        className="btn btn-padding cancel">
                            Cancel
                    </button>
                </div>
            </div>
        </form>
    )
}

export default PlayerInfoForm;