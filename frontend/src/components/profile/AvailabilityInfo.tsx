// Libraries
import { useState } from 'react';
import axios from 'axios';

// Components
import Toggle from '../UI/toggle';
import Timepicker from '../UI/timepicker';

// Utils
import { convertTime } from '@/utils/convertTime';

// Types
import type { IUser, Days } from '@/utils/types';

type TDateTimeFormat = {
    resolvedOptions(): {
        timeZone: string
    }
}

declare namespace Intl {
    type Key = 'calendar' | 'collation' | 'currency' | 'numberingSystem' | 'timeZone' | 'unit';

    function supportedValuesOf(input: Key): string[];

    function DateTimeFormat(): TDateTimeFormat;
}

const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];


export default function AvailabilityInfo({ user }: any) {
    const initialAvailability = {
        sunday: { start_time: user.sunday?.start_time, end_time: user.sunday?.end_time },
        monday: { start_time: user.monday?.start_time, end_time: user.monday?.end_time },
        tuesday: { start_time: user.tuesday?.start_time, end_time: user.tuesday?.end_time },
        wednesday: { start_time: user.wednesday?.start_time, end_time: user.wednesday?.end_time },
        thursday: { start_time: user.thursday?.start_time, end_time: user.thursday?.end_time },
        friday: { start_time: user.friday?.start_time, end_time: user.friday?.end_time },
        saturday: { start_time: user.saturday?.start_time, end_time: user.saturday?.end_time },
    };

    const initialSelectedDays: Days = {
        sunday: user.sunday !== null,
        monday: user.monday !== null,
        tuesday: user.tuesday !== null,
        wednesday: user.wednesday !== null,
        thursday: user.thursday !== null,
        friday: user.friday !== null,
        saturday: user.saturday !== null
    };
    
    const defaultTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const timezones = Intl.supportedValuesOf('timeZone');
    const [selectedDays, setSelectedDays] = useState<Days>(initialSelectedDays);
    const [availability, setAvailability] = useState(initialAvailability);
    const [userTimezone, setUserTimezone] = useState(user.timezone || defaultTimezone);
    const [editing, setEditing] = useState(false);

    function updateDay(day: keyof Days) {
        setSelectedDays(
            {
                ...selectedDays,
                [day]: !selectedDays[day]
            }
        )

        setEditing(true);
    }

    // TODO:
    // - Call API to update user availability, 
    // updating available days, times, and timezone if applicable.

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        const form = (e.currentTarget as HTMLFormElement);
        const timezone = (form[0] as HTMLSelectElement).value;
    
        for (let i = 0; i < form.length; i++) {
            const formElement = form[i] as HTMLInputElement;

            if (formElement.type === 'checkbox') {
                if (formElement.checked) {
                    console.log(form[i + 1]);
                    console.log(form[i + 2]);
                }
            }
        }

        setEditing(false);
    }

    function onCancel() {
        setAvailability(initialAvailability);
        setSelectedDays(initialSelectedDays);
        setUserTimezone(user.timezone || defaultTimezone);
        setEditing(false);
    }

    function onSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        e.preventDefault();

        const selectedTimezone = e.target[e.target.selectedIndex].id;
        setUserTimezone(selectedTimezone);
        setEditing(true);
    }

    return (
        <form className='sm:w-[22rem] md:w-[32rem] mx-auto' onSubmit={(e) => onSubmit(e)}>
            <select className='w-full p-3 my-5' onChange={e => onSelect(e)}>
                {timezones.map((timezone) => {
                    return (
                        <option 
                            id={timezone} 
                            selected={timezone === userTimezone}>
                                {timezone}
                        </option>
                    )
                })}
            </select>
            {days.map((day) => {
                return (
                    <div className='flex flex-row items-center'>
                        <div className='basis-[32%]'>
                            <p>{day[0].toUpperCase() + day.slice(1, day.length)}</p>
                            <Toggle
                                day={day}
                                checked={selectedDays[day as keyof Days]}
                                updateFn={updateDay}
                            />
                        </div>
                        <div className='w-full basis-[68%]'>
                            {selectedDays[day as keyof Days] &&
                                <div className='w-max mx-auto'>
                                    <Timepicker
                                        required={true}
                                        name={day}
                                        value={user[day] && convertTime(user[day].start_time, true)}
                                        classes='h-[40px] w-[90px] sm:h-[50px] sm:w-[105px]'
                                    />
                                    <span className='px-2'>-</span>
                                    <Timepicker
                                        required={true}
                                        name={day}
                                        value={user[day] && convertTime(user[day].end_time, true)}
                                        classes='h-[40px] w-[90px] sm:h-[50px] sm:w-[105px]'
                                    />
                                </div>
                            }
                        </div>
                    </div>
                )
            })}
            {editing && <div className='flex justify-center'>
                    <button type='submit' className='p-3'>Save</button>
                    <button type='button' className='p-3' onClick={() => onCancel()}>Cancel</button>
                </div>
            }
        </form>
    )
}