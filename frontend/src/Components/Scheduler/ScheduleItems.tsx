// Libraries
import React, { ReactNode, useState } from "react";

// Components
import ScheduleItem from "./ScheduleItem";

// Styles
import styles from "./Scheduler.module.css";

// Hooks
import useAvailability from "../../hooks/useAvailability";
import { useMobile } from "../../hooks/useMobile";

// Types
import { fMappedEl, mappedEl } from "../../utils/types";

// Utils
import { spliceString, splitString } from "../../utils/string";

interface PropTypes {
    info: {id: number, attributes: {availabilities: {data: Array<any>}}}
}

interface CarouselPropTypes {
    items: Array<string>,
    render: Array<any>,
}

const Carousel = ({ items, render }: CarouselPropTypes) => {
    const [index, setIndex] = useState(0);
    const { dayOptions } = useAvailability();

    function back() {
        if (index > 0) {
            setIndex(index - 1);
        }
    }

    function forwards() {
        if (index < items.length - 1) {
            setIndex(index + 1);
        }
    }

    return (
        <div className={styles.carouselItem}>
            { index > 0  && 
                <div onClick={() => back()}>
                    Back
                </div> 
            }

            <div className={styles.schedule__day}>
                <p className={styles.schedule__day__header}>{dayOptions[index]}</p>
                <ScheduleItem items={render[index]}/>
            </div>

            { index < (items.length - 1) && 
                <div onClick={() => forwards()}>
                    Forwards
                </div> 
            }
        </div>
    )
}

const ScheduleItems = ({ info }: PropTypes) => {
    // This is not the best way to do this. In the future, 
    // the data structure should be changed, as it would make this a lot easier. 
    // This reducer function was written haphazardly and should change once the data
    // structure is changed.
    const mobile = useMobile();
    const { dayOptions } = useAvailability();

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
            { mobile ? 
                <Carousel items={dayOptions} render={renderKeys}/>
                : 
                <>
                    {renderKeys.map((key: any /* Change this type */, index: number) => {
                        return (
                            <div className={styles.schedule__day} key={index} /* Change this key */>
                                <p className={styles.schedule__day__header}>{dayOptions[index]}</p>
                                <ScheduleItem items={key}/>
                            </div>
                        );
                    })}
                </>
            }
        </>
    );
}

export default ScheduleItems;