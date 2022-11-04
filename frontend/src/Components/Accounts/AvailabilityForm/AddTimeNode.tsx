// Libraries
import React, { useEffect, useState } from "react";

// Utils
import { convertTime } from "../../../utils/convertTime";

type tempT = {
    times: Array<{ 
        id: number, 
        start_time: string, 
        end_time: string 
    }>
} 

const AddTimeNode = ({ times } : tempT) => {
    const [count, setCount] = useState<number>(times.length || 1);
    const [temp, setTemp] = useState(times)

    function incrementState() {
        if (count < 3) {
            setCount(count + 1);
        }
    }

    function decrementState() {
        if (count > 0) {
            if (temp.length > 0 && temp[count - 1]) {   
                let arr = [...temp];
                arr.splice(count - 1, 1);
                setTemp(arr);
            }
            setCount(count - 1);
        }
    }

    function renderElements() {
        let arr = [];
        for (let i = 0; i < count; i++) {
            arr.push(i);
        }
        return arr;
    }

    return (
        <>  
            {renderElements().map((index) => {
                let node = 
                    <>
                        <input type={'time'} 
                            defaultValue={convertTime(temp[index]?.start_time, true)} 
                            required={true}/>
                        <input type={'time'} 
                            defaultValue={convertTime(temp[index]?.end_time, true)} 
                            required={true}/>
                    </>

                return (<li>{node}</li>);
            })}

            {count < 3 && 
                <button type={'button'} onClick={() => incrementState()}>
                    <span className="material-icons">&#xe145;</span>
                </button>}
            {count > 1 && 
                <button type={'button'} onClick={() => decrementState()}>
                    <span className="material-icons">&#xe15b;</span>
                </button>}
        </>
    )
}

export default AddTimeNode;