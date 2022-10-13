// Libraries
import React, { useState } from "react";

// Hooks
import useChecked from "../../hooks/useChecked";

// Styles
import styles from './AccountAvailabilitySelect.module.css';

// Types
import { AvFormPropTypes } from "./types";

const AccountAvailabilitySelect = ({checked, updateState}: AvFormPropTypes) => {
    const dayOptions = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    
    function isChecked(day: string) {
        if (checked[day]) {
            return true
        } else {
            return false;
        }
    }

    return (
        <>
            {dayOptions.map(day =>
                <li key={day}>
                    <div>
                        <input type={'checkbox'} 
                            name={'day-checkbox'}
                            value={day}
                            onClick={() => updateState({[day]: !checked[day]})}
                            defaultChecked={isChecked(day)}
                            className={styles.test}
                        />
                        <label htmlFor={'day-checkbox'}>
                            {day[0].toUpperCase() + day[1]}
                        </label>
                    </div>
                    
                    {isChecked(day) && <div>
                        <input type={'time'}/>
                        <input type={'time'}/>
                    </div>}
                </li>
            )}
        </>
    )
}

export default AccountAvailabilitySelect;