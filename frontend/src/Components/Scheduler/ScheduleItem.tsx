// Libraries
import React from "react";

// Styles
import styles from "./ScheduleItem.module.css";

// Types
import { mappedEl } from "../../utils/types";

// Utils
import { convertTime } from "../../utils/convertTime";

interface PropTypes {
    items: Array<mappedEl> | undefined
}

const ScheduleItem = ({ items }: PropTypes) => {
    return (
        <>  
            {items && items.map((item: mappedEl) => {
                return (
                    <div className={styles.schedule__item} key={item.day + item.createdAt}>
                        <p>{convertTime(item.start_time, false)} - {convertTime(item.end_time, false)}</p>
                    </div>
            )}) || <p className={styles.empty}>No items</p>}
        </>
    )
}

export default ScheduleItem;
