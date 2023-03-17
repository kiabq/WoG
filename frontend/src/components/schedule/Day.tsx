import { convertTime } from "@/utils/convertTime"

type DayProps = {
    day: string,
    times: any
}

export default function Day({ day, times }: DayProps) {
    return (
        <div className="grow basis-0 p-0.5">
            <h3>{day}</h3>
            {times ? times.map((slice: any) => {
                return (
                    <div className="text-xs">
                        <span>{convertTime(slice.start_time, false)} - </span>
                        <span>{convertTime(slice.end_time, false)}</span>
                    </div>
                )
            }) : <p className="text-xs">No Availability</p>}
        </div>
    )
}