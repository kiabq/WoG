// Libraries
import React from 'react';

// Types
import type { Days } from '@/utils/types';

interface IProps {
    day: string,
    checked: boolean,
    classes?: string | null,
    updateFn: (day: keyof Days) => void | null,
}

export default function Toggle({ day, checked, classes, updateFn }: IProps ) {
    return (
        <label className={`relative inline-block w-[45px] h-[25px] rounded-full ${classes ? classes : ''}` }>
            <input onClick={() => updateFn(day as keyof Days)} id={day} checked={checked} className='absolute opacity-0 w-0 h-0 peer' type='checkbox'/>
            <div className='transition-all absolute inset-0 cursor-pointer p-0 rounded-full bg-neutral-400 peer-checked:bg-blue-500 before:transition-all before:absolute before:h-[18px] before:w-[18px] before:bg-[#2196F3] before:rounded-full before:pl-[4px] before:pb-[4px] before:content-[""] peer-checked:before:translate-x-[20px] before:bg-white before:m-[3px]'/>
        </label>
    )
}