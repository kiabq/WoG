// Libraries
import React from 'react';

type IProps = {
    required?: boolean,
    classes?: string | null,
    name?: string
    value?: string | undefined
}

export default function Timepicker({ classes, required, name, value }: IProps) {
    return (
        <input 
            type='time' 
            required={required}
            name={name}
            defaultValue={value}
            className={`border-2 border-neutral-500 color-neutral-500 p-2 rounded-lg h-3/4 
                ${classes ? classes : ''}`
            }/>
    )
}