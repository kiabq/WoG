// Libraries
import React, { useEffect, useState, useRef, ChangeEvent } from "react"
import axios from "axios";

// Components
import ScheduleItems from "./ScheduleItems";

// Styles
import globals from '../../globals.module.css';
import styles from './Scheduler.module.css';

interface DM {
    id: number,
    attributes: {
        availabilities: {
            data: [mappedEl]
        }
        name: string,
    }
}

type mappedEl = {
    createdAt: Date,
    updatedAt: Date,
    publishedAt: Date,
    start_time: string,
    day: string,
    end_time: string,
}

const Scheduler = () => {
    const [DM, setDM] = useState<Array<DM> | null>(null);
    const [selectedDM, setSelectedDM] = useState<number | null>(null);
    const refBool = useRef(false);

    function handleChange(e: ChangeEvent<HTMLSelectElement>) {
        if (e.currentTarget.value === 'default') {
            setSelectedDM(null);
        } else {
            setSelectedDM(e.currentTarget.selectedIndex - 1);
        }
    }

    useEffect(() => {
        if (!refBool.current) {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/dungeon-masters?populate=%2A`)
            .then((res) => {
                setDM(res.data.data);
            })
            .catch((err) => console.log(err));
        }
        refBool.current = true;
    }, []);

    return (
        <div className={styles.schedule}>
            <div>
                <select name='DM' id='DM' onChange={(e) => handleChange(e)}>
                    <option value='default'>Select DM</option>
                    {DM && DM ? DM.map((el) => 
                        <option key={el.id} value={el.attributes.name}>
                            {el.attributes.name}
                        </option>) 
                        : 
                        <option>Empty</option>}
                </select>
                
                <p>PST</p>

                <div className={styles.schedule_items}>
                    {(DM != null && selectedDM != null) ? <ScheduleItems info={DM[selectedDM]}/> : <p>Select DM</p>}
                </div>
            </div>
        </div>
    )
}

export default Scheduler;