// Libraries
import React, { useEffect, useState } from "react";

// Components
import AccountAvailabilityForm from "./AccountAvailabilityForm";
import AccountAvailability from "./AccountAvailability";

// Styles
import styles from './AccountForms.module.css';

// Types
import { ViewPropTypes, dayObj, hasKey } from './types';

// Helper function used to determine if a provided key is indeed an index 
// of the provided object.
// https://dev.to/mapleleaf/indexing-objects-in-typescript-1cgi

const AccountForms = ({ account, isEdit, toggleEdit}: ViewPropTypes) => {
    const [checked, setChecked] = useState<dayObj>()
    
    useEffect(() => {
        let obj: dayObj = { 
            sunday: false, 
            monday: false, 
            tuesday: false, 
            wednesday: false, 
            thursday: false, 
            friday: false, 
            saturday: false 
        }

        // Add Error Handling
        if (account.availability) {
            for (let i = 0; i < account.availability.days.length; i++) {
                let day: string = account.availability.days[i].day;
                if (hasKey(obj, day)) {
                    obj[day] = true;
                }
            }
    
            setChecked(obj);
        }
    }, [account]);
    
    return (
        <div>
            <button onClick={() => toggleEdit()}>Edit</button>
            {isEdit && <AccountAvailabilityForm 
                account={account} 
                toggleEdit={toggleEdit}
                checked={checked}
            />}
            {!isEdit && <AccountAvailability 
                checked={checked}
            />}
        </div>
    )
}

export default AccountForms;