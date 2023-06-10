import { useState } from 'react';
import OptionalInfo from './OptionalQuestions';

import { Edit } from '@/utils/types';
import PersonalInfo from './PersonalInfo';
import AvailabilityInfo from './AvailabilityInfo';
import Toggle from '../UI/toggle';
import { getContext } from '@/context/usercontext';

// Types
import type { IUser } from '@/utils/types';

export default function ProfileInfo() {
  const [optionalEdit, setOptionalEdit] = useState<Edit>(Edit.none);
  const user: IUser = getContext();
  
  return (
    <>
      <div className='flex flex-col mb-16 lg:flex-row'>
        <PersonalInfo user={user}/>
        <AvailabilityInfo user={user}/>
      </div>
      <OptionalInfo user={user} edit={optionalEdit} setEdit={(edit: Edit) => setOptionalEdit(edit)}/>

    </>
  );
}