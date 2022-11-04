// Libraries
import React, { useEffect, useState } from "react";

// Components
import AddTimeNode from "./AddTimeNode";

// Styles
import styles from './AccountAvailability.module.css';

// Hooks
import useAvailability from "../../../hooks/useAvailability";

const AccountAvailabilitySelect = () => {
    // Used to map list elements (each checkbox)}
    const { checked, getAvailableDays, getAvailableTimes,updateChecked, dayOptions } = useAvailability();
    
    if (checked !== undefined) {
        return (
            <div>
                {dayOptions.map((day) =>
                    <div key={day}>
                        <div>
                            <input type={'checkbox'} 
                                name={'day-checkbox'}
                                value={day}
                                className={styles.test}
                                onClick={() => updateChecked(day)}
                                defaultChecked={getAvailableDays(day)}
                            />                                              
                            <label className={styles.tempLabelClass} htmlFor={'day-checkbox'}>
                                {day[0].toUpperCase() + day[1]}
                            </label>
                        </div>
                        <ul>
                            {getAvailableDays(day) && <AddTimeNode times={getAvailableTimes(day)}/>}
                        </ul>
                    </div>
                )}
            </div>
        )
    } else {
        return <p>Loading...</p>
    }
}

export default AccountAvailabilitySelect;