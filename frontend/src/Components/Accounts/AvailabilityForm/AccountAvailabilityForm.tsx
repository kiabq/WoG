// Libraries
import React, { useState, useEffect } from "react";

// Components
import AccountAvailabilitySelect from "./AccountAvailabilitySelect";

// Styles
import styles from "./AccountForms.module.css";
import globals from "../../../globals.module.css"

// Hooks
import { useAuth } from "../../../hooks/useProvider";
import { useAcct, triggerAccountUpdate } from "../../../hooks/useAccount";

// Types
import { Edit, EditFnProp, FormIterateType } from "../types";

// Utils
import { updateAvailability, createAvailability } from "../../../utils/rest";

const AccountAvailabilityForm = ({ toggleEdit }: EditFnProp) => {
    const auth = useAuth();
    const acct = useAcct();
    
    // Implement error handling
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {   
        e.preventDefault();

        const eventForm: HTMLFormElement | FormIterateType = e.currentTarget;
        let availableDayData: Array<object> = [];
        
        if (auth !== null && auth.checkLogin()) {
            if (eventForm !== null) {
                let arr = [];
                let dayArr = [];
                let tempArr = [];

                for(let i = 0; i < eventForm.length; i++) {
                    let userSelectedDay = eventForm[i];

                    if (userSelectedDay.type === 'time') {
                        tempArr.push(i)
                    } else {
                        if (tempArr.length > 0) {
                            arr.push(tempArr);
                        }
                        tempArr = [];
                    }

                    if (userSelectedDay.checked) {  
                        dayArr.push(i);
                    }
                }

                for (let i = 0; i < dayArr.length; i++) {
                    let availableTimes = [];
                    let sliced = [];
                    let userSelectedDay = eventForm[dayArr[i]];

                    for (let j = 0; j < arr[i].length; j += 2){
                        sliced.push(arr[i].slice(j, j + 2));
                    }

                    for (let v = 0; v < sliced.length; v++) {
                        let start_time = eventForm[sliced[v][0]];
                        let end_time = eventForm[sliced[v][1]];

                        availableTimes.push({"start_time": `${start_time.value}:00.000`, "end_time": `${end_time.value}:00.000`});
                    }

                    availableDayData.push({ 
                        "day" : userSelectedDay.value,
                        "times": availableTimes
                    });
                }
            } else {
                // Throw error and handle error
            }
    
            // Type-narrowing
            if (acct.accountInfo !== undefined && auth.token) {
                    if (acct.accountInfo.availability.days) {
                        updateAvailability(availableDayData, auth.token).then(
                            (res) => triggerAccountUpdate(res, acct)
                        )
                    } else {
                        createAvailability(availableDayData, auth.token).then(
                            (res) => triggerAccountUpdate(res, acct)
                        )
                    }
                }
        } else {
            // User was logged out before submitting form.
            // Throw and handle error here.
            console.log("Something went wrong!");
        } 
        toggleEdit(Edit.none);
    }

    return (
    <>
        <form onSubmit={(e) => handleSubmit(e)}>      
            <AccountAvailabilitySelect/>

            <input type='submit' value='Submit' className={`${globals.submit}`}/>
            <button type='button' onClick={() => toggleEdit(Edit.none)} className={`${globals.cancel}`}>Cancel</button>
        </form> 
    </>
    )
}

export default AccountAvailabilityForm;