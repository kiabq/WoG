import { useState } from 'react';
import OptionalInfo from './OptionalQuestions';

import { Edit } from '@/utils/types';
import PersonalInfo from './PersonalInfo';
import AvailabilityInfo from './AvailabilityInfo';
import { getContext } from '@/context/usercontext';

export default function ProfileInfo() {
  const [optionalEdit, setOptionalEdit] = useState<Edit>(Edit.none);
  const [personalEdit, setPersonalEdit] = useState<Edit>(Edit.none);
  const [availabilityEdit, setAvailabilityEdit] = useState<Edit>(Edit.none);
  const user = getContext();

  return (
    <>
      <div className='flex flex-col mb-16 lg:flex-row'>
        <PersonalInfo user={user} edit={personalEdit} setEdit={(edit: Edit) => setPersonalEdit(edit)}/>
        <OptionalInfo user={user} edit={optionalEdit} setEdit={(edit: Edit) => setOptionalEdit(edit)}/>
      </div>
      <AvailabilityInfo user={user} edit={availabilityEdit} setEdit={(edit: Edit) => setAvailabilityEdit(edit)}/>
    </>
  );
}