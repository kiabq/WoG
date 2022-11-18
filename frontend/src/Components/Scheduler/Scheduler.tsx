// Libraries
import React, { useEffect, useState, useRef, ChangeEvent } from "react"
import axios from "axios";

// Components
import ScheduleItems from "./ScheduleItems";

// Hooks
import { useAuth } from "../../hooks/useProvider";

// Styles
import globals from "../../globals.module.css";
import styles from "./Scheduler.module.css";

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

    function handleChange(e: ChangeEvent<HTMLSelectElement>) {
        if (e.currentTarget.value === "default") {
            setSelectedDM(null);
        } else {
            setSelectedDM(e.currentTarget.selectedIndex - 1);
        }
    }

    useEffect(() => {
        const controller = new AbortController;
        const signal = controller.signal;

        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/dungeon-masters?populate=%2A`, { signal: signal })
        .then(
            (res) => {
                setDM(res.data.data);
            }
        )
        .catch((err) => {
            // Implement Error Handling
            if (err.code === "ECONNABORTED") {
                console.log("Error Aborted")
            } else {
                console.log(err)
            }
        })

        return () => {
            controller.abort();
        }
    }, []);

    return (
        <div className={styles.schedule}>
                <h2 id="schedule" className={`${styles.schedule__header} rb_bld_h4`}>Game Times</h2>
                <select name="DM" id="DM" onChange={(e) => handleChange(e)}>
                    <option value="default">Select DM</option>
                    {DM && DM ? DM.map((el) => 
                        <option key={el.id} value={el.attributes.name}>
                            {el.attributes.name}
                        </option>) 
                        : 
                        <option>No DMs</option>}
                </select>

                <div className={styles.schedule__items}>
                    {(DM !== null && selectedDM != null) ? <ScheduleItems info={DM[selectedDM]}/> : <p>Select DM</p>}
                </div>

                <p>* All Timezones are in Pacific Standard Time</p>
        </div>
    )
}

export default Scheduler;