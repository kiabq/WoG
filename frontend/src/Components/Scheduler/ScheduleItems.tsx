// Libraries
import React from "react";

// Components
import ScheduleItem from "./ScheduleItem";

// Styles
import styles from './Scheduler.module.css';

interface PropTypes {
    info: {id: number, attributes: {availabilities: {data: Array<any>}}}
}

type fMappedEl = {
    sunday: Array<object>,
    monday: Array<object>,
    tuesday: Array<object>,
    wednesday: Array<object>,
    thursday: Array<object>,
    friday: Array<object>,
    saturday: Array<object>,
}

type mappedEl = {
    createdAt: Date,
    updatedAt: Date,
    publishedAt: Date,
    start_time: string,
    end_time: string,
    day: string,
}

function spliceString(str: string, index: number, count: number, add: string) {
    if (index < 0) {
        index = str.length + index;
        if (index < 0) {
            index = 0;
        }
    }

    return str.slice(0, index) + (add || "") + str.slice(index + count);
}

function splitString(string: string): number {
    let temp = string.split(':');
    
    return (parseInt(temp[0] + temp[1]));
}

const ScheduleItems = ({info}: PropTypes) => {
    // This is not the best way to do this. In the future, 
    // the data structure should be changed, as it would make this a lot easier. 
    // This reducer function was written haphazardly and should change once the data
    // structure is changed.
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    function convertArrToObj (arr: Array<any>, key: string) {
        const dayArr = {
            sunday: [],
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
            saturday: [],
        };
        
        return arr.reduce((obj, item) => {
            let start_str = spliceString(item.start_time, 5, item.start_time.length, '');
            // let end_str = spliceString(item.end_time, 5, item.end_time.length, '');

            let arr: Array<mappedEl> = [];

            switch(item.day) {
                case 'sunday':
                    arr = dayArr.sunday;
                    break; 
                case 'monday':
                    arr = dayArr.monday;
                    break;
                case 'tuesday':
                    arr = dayArr.tuesday;
                    break;
                case 'wednesday':
                    arr = dayArr.wednesday;
                    break;
                case 'thursday':
                    arr = dayArr.thursday;
                    break;
                case 'friday':
                    arr = dayArr.friday;
                    break;
                case 'saturday':
                    arr = dayArr.saturday;
                    break;
            }

            if (arr.length === 0) {
                arr.push(item);
            } else {
                for (let i = 0; i < arr.length; i++) {
                    let arr_numeral = splitString(arr[i].start_time);
                    let cur_numeral = splitString(start_str);

                    if (arr_numeral > cur_numeral && arr.indexOf(item) === -1) {
                        arr.splice(i, 0, item);
                    }
                }
            }

            return ({
                ...obj,
                [item[key]]: arr
            });
        }, {});
    };

    const map = (info.attributes.availabilities.data).map((el) => {
        return el.attributes;
    });

    const fMap: fMappedEl = convertArrToObj(map, "day");
    const renderKeys = [fMap.sunday, fMap.monday, fMap.tuesday, fMap.wednesday, fMap.thursday, fMap.friday, fMap.saturday];
    
    return (
        <>
            {renderKeys.map((key: any /* Change this type */, index: number) => {
                return (
                    <div className={styles.schedule__day} key={index} /* Change this key */>
                        <p className={styles.schedule__day__header}>{days[index]}</p>
                        <ScheduleItem items={key}/>
                    </div>
                );
            })}
        </>
    );
}

export default ScheduleItems;