// Libraries
import { useState } from 'react';
import axios from 'axios';

// Components
import Toggle from '../UI/toggle';
import Timepicker from '../UI/timepicker';

// Utils
import { convertTime } from '@/utils/convertTime';

// Types
import type { IndexType, Days, IUser } from '@/utils/types';

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

// fix dis - from: tired kb
export default function AvailabilityInfo({ user }: IUser) {
    // God has forsaken us.
    const initialAvailability = {
        sunday: { start_time: user.availability?.sunday?.start_time, end_time: user.availability?.sunday?.end_time },
        monday: { start_time: user.availability?.monday?.start_time, end_time: user.availability?.monday?.end_time },
        tuesday: { start_time: user.availability?.tuesday?.start_time, end_time: user.availability?.tuesday?.end_time },
        wednesday: { start_time: user.availability?.wednesday?.start_time, end_time: user.availability?.wednesday?.end_time },
        thursday: { start_time: user.availability?.thursday?.start_time, end_time: user.availability?.thursday?.end_time },
        friday: { start_time: user.availability?.friday?.start_time, end_time: user.availability?.friday?.end_time },
        saturday: { start_time: user.availability?.saturday?.start_time, end_time: user.availability?.saturday?.end_time },
    };

    const initialSelectedDays: Days = {
        sunday: !!user.availability?.sunday,
        monday: !!user.availability?.monday,
        tuesday: !!user.availability?.tuesday,
        wednesday: !!user.availability?.wednesday,
        thursday: !!user.availability?.thursday,
        friday: !!user.availability?.friday,
        saturday: !!user.availability?.saturday
    };

    const defaultTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const timezones = Intl.supportedValuesOf('timeZone');
    const [selectedDays, setSelectedDays] = useState<Days>(initialSelectedDays);
    const [availability, setAvailability] = useState(initialAvailability);
    const [userTimezone, setUserTimezone] = useState(user.availability?.timezone || defaultTimezone);
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

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        const form = (e.currentTarget as HTMLFormElement);
        const timezone = (form[0] as HTMLSelectElement).value;
        // Change the generic on this type
        let data: IndexType<{ start_time: string, end_time: string } | string> = {
            timezone: timezone
        };

        for (let i = 0; i < form.length; i++) {
            const formInput = form[i] as HTMLInputElement;
            const start = form[i + 1] as HTMLInputElement;
            const end = form[i + 2] as HTMLInputElement;
            const day = formInput.id;

            if (formInput.checked) {
                data[day] = {
                    start_time: `${start.value}:00.000`,
                    end_time: `${end.value}:00.000`
                };
            }
        }

        await axios.put(`/api/user`, {
            'availability': data
        }).then((res) => {
            console.log(res);
        });

        setEditing(false);
    }

    function onCancel() {
        setAvailability(initialAvailability);
        setSelectedDays(initialSelectedDays);
        setUserTimezone(user.availability?.timezone || defaultTimezone);
        setEditing(false);
    }

    function onSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        e.preventDefault();
        const selectedTimezone = e.target[e.target.selectedIndex].id;
        setUserTimezone(selectedTimezone);
        setEditing(true);
    }

    return (
        <div className='mx-auto'>
            <h2 className='text-xl text-center'>Availability</h2>
            <form className='sm:w-[22rem] md:w-[32rem]' onSubmit={(e) => onSubmit(e)}>
                <select className='w-full p-3 my-5' onChange={e => onSelect(e)}>
                    {timezones.map((timezone) => {
                        return (
                            <option
                                id={timezone}
                                selected={timezone === userTimezone}
                                key={timezone}>
                                {timezone}
                            </option>
                        )
                    })}
                </select>
                {days.map((day) => {
                    return (
                        <div className='flex flex-row items-center' key={day}>
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
                                            value={user.availability?.[day] && convertTime(user.availability?.[day].start_time, true)}
                                            classes='h-[40px] w-[100px] sm:h-[50px] sm:w-[110px] text-sm md:text-base'
                                        />
                                        <span className='px-2'>-</span>
                                        <Timepicker
                                            required={true}
                                            name={day}
                                            value={user.availability?.[day] && convertTime(user.availability?.[day].end_time, true)}
                                            classes='h-[40px] w-[100px] sm:h-[50px] sm:w-[110px] text-sm md:text-base '
                                        />
                                    </div>
                                }
                            </div>
                        </div>
                    )
                })}
                {editing && <div className='flex justify-center pt-5'>
                        <button type='submit' className='w-20 py-1 mr-1 text-slate-50 bg-blue-500 rounded-lg'>Save</button>
                        <button type='button' className='w-20 py-1 ml-1 text-blue-500 border-blue-500 border-2 rounded-lg' onClick={() => onCancel()}>Cancel</button>
                    </div>
                }
            </form>
        </div>
    )
}