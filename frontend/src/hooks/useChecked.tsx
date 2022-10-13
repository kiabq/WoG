// Libraries
import React, { useState, useEffect, useReducer, useRef, useLayoutEffect } from "react";

// Types
import { AccountType, dayIter, hasKey } from "../Components/Accounts/types";

const INITIAL_STATE = { 
    sunday: false, 
    monday: false, 
    tuesday: false, 
    wednesday: false, 
    thursday: false, 
    friday: false, 
    saturday: false 
}

const useChecked = (account?: AccountType) => {
    const [checked, setChecked] = useState<dayIter>(INITIAL_STATE);

    function updateState(val: any) {
        setChecked({...checked, ...val});
    }

    function initializeState() {
        let obj = INITIAL_STATE;

        if (account?.availability) {
            for (let i = 0; i < account.availability.days.length; i++) {
                let day = account.availability.days[i].day;
                if (hasKey(obj, 'sunday')) {
                    obj['sunday'] = true;
                }
            }
        }

        return obj;
    }

    useEffect(() => {
        setChecked(() => initializeState());
    }, [account]);

    return ({
        checked,
        updateState
    })
}

export default useChecked;