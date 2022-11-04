// Libraries
import React, { useEffect, useState, ReactNode } from "react";

// Components
import { EditButton } from "../../Buttons/Buttons";

// Styles
import styles from "./AccountAvailability.module.css";
import globals from "../../../globals.module.css";

// Hooks
import useAvailability from "../../../hooks/useAvailability";
import { useAcct } from "../../../hooks/useAccount";

// Types
import { Edit, EditFnProp } from "../types";

// Utils
import { convertTime } from "../../../utils/convertTime";

const AccountAvailability = ({ toggleEdit }: EditFnProp) => {
    const { accountInfo } = useAcct();
    const { dayOptions, getAvailableDays, getAvailableTimes } = useAvailability();

    if (accountInfo.availability !== undefined) {
        return (
            <div className={styles.av}>
                <div className={styles.av__opts}>
                    {dayOptions.map((day) =>
                        <div className={`${styles.av__day}`}>  
                            <span key={day} className={`${styles.av__day__opt} ${getAvailableDays(day) ? `${styles.av__sel}` : ''}`}>
                                {day[0].toUpperCase()}
                            </span>
                            <div className={`${styles.av__day__opt__tim}`}>
                                {getAvailableDays(day) ? getAvailableTimes(day).map((e) => 
                                    <p>{convertTime(e.start_time, false)} - {convertTime(e.end_time, false)}</p>
                                ) : <p>No items</p>}
                            </div>
                        </div>
                    )}
                </div>
                <div className={styles.av__dis}>
                    <button onClick={() => toggleEdit(Edit.availability)} className={`${styles.av__edi}`}>
                        <span>Edit Availability</span>
                        <span className="material-icons">&#xf88d;</span>
                    </button>
                </div>
            </div>
        )
    } else {
        return <p>Loading</p>
    }
}

export default AccountAvailability;