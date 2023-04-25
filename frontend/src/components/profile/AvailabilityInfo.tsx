// Libraries
import { FormEvent } from 'react';
import axios from 'axios';

// Utils
import { convertTime } from '@/utils/convertTime';

// Types
import { Edit } from '@/utils/types';
import type { IUser } from '@/utils/types';

interface IProps {
    user: IUser,
    edit: Edit,
    setEdit: (edit: Edit) => void
}

export default function AvailabilityInfo({ user, edit, setEdit }: IProps) {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

    async function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const form: any = {
            sunday: user.sunday ?? { start_time: null, end_time: null },
            monday: user.monday ?? { start_time: null, end_time: null },
            tuesday: user.tuesday ?? { start_time: null, end_time: null },
            wednesday: user.wednesday ?? { start_time: null, end_time: null },
            thursday: user.thursday ?? { start_time: null, end_time: null },
            friday: user.friday ?? { start_time: null, end_time: null },
            saturday: user.saturday ?? { start_time: null, end_time: null }
        };
        const submitted = e.currentTarget;

        for (let i = 0; i < submitted.length; i++) {
            if ((submitted[i] as HTMLFormElement).type === 'time') {
                const day = (submitted[i] as HTMLFormElement).dataset.day;
                const type = (submitted[i] as HTMLFormElement).dataset.type;

                if (submitted[i].value) {
                    if (type && day) {
                        form[day][type] = `${submitted[i].value}:00.000`;
                    }
                    
                }
            }
        }

        if (form) {
            await axios.put(`/api/user`, form).then((res) => {
                if (res.status === 200) { }
            });
        }

        setEdit(Edit.none);
    }

    return (
        <form className='flex flex-col h-[34rem] relative md:h-[8rem]' onSubmit={(e) => submit(e)}>
            <div className='flex flex-col w-full h-24 text-center md:flex-row'>
                {days.map((day) => {
                    return (
                        <div className='flex flex-col items-center grow basis-0' key={day}>
                            <p>{day[0].toUpperCase() + day.slice(1)}</p>
                            <div className='w-fit'>
                                <div className='flex text-left'>
                                    <p className='pr-3 w-2/6'>From:</p>
                                    <input className='w-4/6'
                                        type='time'
                                        data-day={day}
                                        data-type='start_time'
                                        defaultValue={user[day] && convertTime(user[day].start_time, true)}
                                        required>
                                    </input>
                                </div>
                                <div className='flex text-left'>
                                    <p className='pr-3 w-2/6'>To:</p>
                                    <input className='w-4/6'
                                        type='time'
                                        data-day={day}
                                        data-type='end_time'
                                        defaultValue={user[day] && convertTime(user[day].end_time, true)}
                                        required>
                                    </input>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {
                edit === Edit.editing ?
                    <div className='mx-auto absolute bottom-0 md:relative'>
                        <button type='submit'>
                            Submit
                        </button>

                        <button type='button' onClick={() => { setEdit(Edit.none) }}>
                            Cancel
                        </button>
                    </div>
                    :
                    <button type='button' onClick={() => { setEdit(Edit.editing) }} className='absolute md:relative bottom-0 mx-auto'>
                        Edit
                    </button>
            }
        </form >
    )
}