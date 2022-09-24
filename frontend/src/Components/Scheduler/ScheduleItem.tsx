// Libraries
import React from "react";

// Styles
import styles from './ScheduleItem.module.css';

type mappedEl = {
    createdAt: Date,
    updatedAt: Date,
    publishedAt: Date,
    start_time: string,
    day: string,
    end_time: string,
}

function convertTime(timestr: string) {
    var hours: number = parseInt(timestr.slice(0, 2));
    var minutes: number = parseInt(timestr.slice(3, 5));
    var meridian = 'AM';

    let fHours: number | string = hours;
    let fMinutes: number | string;

    fMinutes = minutes >= 10 ? fMinutes = minutes : fMinutes = `0${minutes}`;

    if (typeof fHours != 'number') {
        if (parseInt(fHours) === 0) {
            fHours = 12;
        }
    } else {
        fHours = (fHours + 11) % 12 + 1;
    }

    if (hours > 11 && hours != 0) {
        meridian = 'PM';
    }

    return (`${fHours}:${fMinutes} ${meridian}`);
}

const ScheduleItem = (props: { items: Array<mappedEl> | undefined}) => {
    return (
        <>
            {props.items && props.items.map((item: mappedEl) => {
                return (
                    <div className={styles.schedule_item} key={item.day + item.createdAt}>
                        <p>{convertTime(item.start_time)} - {convertTime(item.end_time)}</p>
                    </div>
            )}) || <p className={styles.empty}>No items</p>}
        </>
    )
}

export default ScheduleItem;
