// Libraries
import { useState } from "react";

// Styles
import styles from "./AccountAvailability.module.css";

// Hooks
import useAvailability from "../../../hooks/useAvailability";
import { useAcct } from "../../../hooks/useAccount";

// Types
import { Edit, EditFnProp } from "../../../utils/types";

// Utils
import { convertTime } from "../../../utils/convertTime";

const AccountAvailability = ({ toggleEdit }: EditFnProp) => {
    const { accountInfo } = useAcct();
    const { dayOptions, getAvailableDays, getAvailableTimes } = useAvailability();

    if (accountInfo.availability !== undefined) {
        return (
            <div className={`${styles.availability__container} ${styles.availability}`}>
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
                <div>
                    <button onClick={() => toggleEdit(Edit.availability)} className={`btn btn-padding edit ${styles.av__edi}`}>
                        <span>Edit Availability</span>
                    </button>
                </div>
            </div>
        )
    } else {
        return <p>Loading</p>
    }
}

export default AccountAvailability;