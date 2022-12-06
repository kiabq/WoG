// Libraries
import React from "react";

// Styles
import styles from "./ScheduleItem.module.css";

// Utils
import { convertTime } from "../../utils/convertTime";

type mappedEl = {
    createdAt: Date,
    updatedAt: Date,
    publishedAt: Date,
    start_time: string,
    day: string,
    end_time: string,
}

const ScheduleItem = (props: { items: Array<mappedEl> | undefined}) => {
    return (
        <>  
            {props.items && props.items.map((item: mappedEl) => {
                return (
                    <div className={styles.schedule__item} key={item.day + item.createdAt}>
                        <p>{convertTime(item.start_time, false)} - {convertTime(item.end_time, false)}</p>
                    </div>
            )}) || <p className={styles.empty}>No items</p>}
        </>
    )
}

export default ScheduleItem;
