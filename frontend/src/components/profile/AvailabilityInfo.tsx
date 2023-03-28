import { FormEvent } from "react";

// Utils
import { convertTime } from "@/utils/convertTime";

// Types
import { Edit } from "@/utils/types";

export default function AvailabilityInfo({ user, edit, setEdit }: any) {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

    async function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = {
            sunday: user.sunday,
            monday: user.monday,
            tuesday: user.tuesday,
            wednesday: user.wednesday,
            thursday: user.thursday,
            friday: user.friday,
            saturday: user.saturday
        };

        for (let i = 0; i < e.currentTarget.length; i++) {
            if ((e.currentTarget[i] as HTMLFormElement).type === 'time') {
                const day = (e.currentTarget[i] as HTMLFormElement).dataset.day;
                const type = (e.currentTarget[i] as HTMLFormElement).dataset.type;

                // console.log(day, type);
                if (e.currentTarget[i].value) {
                    form[day][type] = `${e.currentTarget[i].value}:00.000`;
                }
            }
        }

        setEdit(Edit.none);
    }


    return (
        <form className='flex flex-col h-[23rem] relative md:h-[8rem]' onSubmit={(e) => submit(e)}>
            <div className='flex flex-col w-full h-24 text-center md:flex-row'>
                {days.map((day) => {
                    return (
                        <div className='grow basis-0' key={day}>
                            <p>{day[0].toUpperCase() + day.slice(1)}</p>
                            <input type='time' data-day={day} data-type={'start_time'} defaultValue={user[day] && convertTime(user[day].start_time, true)} required></input>
                            <input type='time' data-day={day} data-type={'end_time'} defaultValue={user[day] && convertTime(user[day].end_time, true)} required></input>
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