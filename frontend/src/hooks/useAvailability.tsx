// Libraries
import React, { useState, useEffect, useReducer, useRef, useLayoutEffect } from "react";
import { ReactNode } from "react";

// Hooks
import { useAcct } from "./useAccount";

type userData = {
    times: Array<{id: number, start_time: string, end_time: string}>,
    checked: boolean
} | undefined

const useAvailability = () => {
    const { accountInfo } = useAcct();

    const [checked, setChecked] = useState<Map<string, userData>>(new Map());
    const dayOptions = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

    function getAvailableDays(day: string) {
        const availibilityInfo = checked.get(day);

        if (availibilityInfo?.checked !== undefined) {
            return availibilityInfo?.checked;
        }
    }

    function getAvailableTimes(day: string) {
        const availibilityInfo = checked.get(day);

        if (availibilityInfo?.times !== undefined) {
            return availibilityInfo?.times;
        } else {
            return [];
        }
    }
    
    function updateChecked(day: string) {
        const prevMap = new Map(checked);
        const availibilityInfo = checked.get(day);
        prevMap?.set(day, {
            times: availibilityInfo?.times!, 
            checked: !availibilityInfo?.checked
        });
        setChecked(prevMap);
    }

    useEffect(() => {
        const initMap = new Map();

        // Initialize state
        for (let i = 0; i < dayOptions.length; i++) {
            initMap.set(dayOptions[i], {
                times: [],
                checked: false         
            })
        }   

        if (accountInfo.availability?.days !== undefined) {
            for (let i = 0; i < accountInfo.availability.days.length; i++) {
                initMap.set(accountInfo.availability.days[i].day, {
                    times: accountInfo.availability.days[i].times,
                    checked: true
                })
            }
        }

        setChecked(initMap);
    }, [accountInfo])

    return {
        checked,
        getAvailableDays,
        getAvailableTimes,
        updateChecked,
        dayOptions
    }
}

export default useAvailability;