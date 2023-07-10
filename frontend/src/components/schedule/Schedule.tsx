import { useState } from 'react'
import Day from './Day';

type ScheduleProps = {
  dm: Array<any>
}

export default function Schedule({ dm }: ScheduleProps) {
  const [selectedDM, setSelectedDM] = useState<any>([]);

  return (
    <>
      <select name='dungeon-master' id='dms' className='text-center' onChange={(val) => {
        setSelectedDM(dm.filter(value => value.attributes.name === val.target.value));
      }}>
        <option value='' selected disabled hidden>Select a DM</option>
        {dm?.map((val) => {
          return <option value={val.attributes.name} key={val.attributes.name}>{val.attributes.name}</option>
        })}
      </select>
      <div className='flex flex-col justify-center pt-6 md:flex-row'>{selectedDM[0] ?
        <>
          <Day day='Sunday' times={selectedDM[0].attributes.sunday?.times} />
          <Day day='Monday' times={selectedDM[0].attributes.monday?.times} />
          <Day day='Tuesday' times={selectedDM[0].attributes.tuesday?.times} />
          <Day day='Wednesday' times={selectedDM[0].attributes.wednesday?.times} />
          <Day day='Thursday' times={selectedDM[0].attributes.thursday?.times} />
          <Day day='Friday' times={selectedDM[0].attributes.friday?.times} />
          <Day day='Saturday' times={selectedDM[0].attributes.saturday?.times} />
        </>
        : 'Nothing Selected'}</div>
    </>
  )
}