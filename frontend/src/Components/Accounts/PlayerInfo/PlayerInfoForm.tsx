// Libraries
import React from "react";

// Styles
import styles from "./PlayerInfo.module.css";
import globals from "../../../globals.module.css";

// Hooks
import { useAuth } from "../../../hooks/useProvider";
import { useAcct, triggerAccountUpdate } from "../../../hooks/useAccount";

// Types
import { Edit, EditFnProp, FormIterateType } from "../types";

// Utils
import { updateUserInformation } from "../../../utils/rest";

const PlayerInfoForm = ({ toggleEdit }: EditFnProp) => {
    const auth = useAuth();
    const acct = useAcct();

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        
        const form = e.currentTarget as FormIterateType;

        const userInfoData = {
            name: form[0].value,
            invoiceEmail: form[1].value,
            pronoun: form[2].value,
            dob: form[3].value
        }

        if (auth !== null && auth.checkLogin()) {
            if (acct.accountInfo !== undefined && auth.token) {
                console.log('reached')
                updateUserInformation(userInfoData, auth.token).then(
                    (res) => {triggerAccountUpdate(res, acct)}
                )
            }
        }

        toggleEdit(Edit.none)
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)} className={`${styles.playerinfo__form}`}>
            <div className={`${styles.playerinfo__form__inputs}`}>
                <div>
                    <label htmlFor={"name"}>Name*:</label>
                    <input type={"text"}
                        name="name" 
                        placeholder={'Enter Name'} 
                        defaultValue={acct.accountInfo.name}
                        required={true}
                    />
                </div>

                <div>
                    <label htmlFor={"invoice-email"}>Invoice Email:</label>
                    <input type={"email"}
                        name="invoice-email" 
                        placeholder={"Enter Email"} 
                        defaultValue={acct.accountInfo.invoiceEmail}
                        required={true}
                    />
                </div>

                <div>
                    <label htmlFor={"pronoun"}>Pronoun:</label>
                    <select name={"pronoun"} defaultValue={(acct.accountInfo.pronoun)}>
                        <option value="">Select Pronoun</option>
                        <option value="He/Him">He/Him</option>
                        <option value="She/Her">She/Her</option>
                        <option value="They/Them">They/Them</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div>
                    <label htmlFor={"dob"}>Date of Birth</label>
                    <input name={"dob"} type={"date"} defaultValue={acct.accountInfo.dob}/>
                </div>
            </div>

            <div>
                <input type="submit" value="Submit" className={`${globals.submit}`}/>
                <button onClick={() => toggleEdit(Edit.none)} className={`${globals.cancel}`}>Cancel</button>
            </div>
        </form>
    )
}

export default PlayerInfoForm;