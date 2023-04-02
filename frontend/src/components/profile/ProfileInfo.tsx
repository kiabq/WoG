import { useState } from 'react';
import OptionalInfo from './OptionalQuestions';

import { Edit } from '@/utils/types';
import PersonalInfo from './PersonalInfo';
import AvailabilityInfo from './AvailabilityInfo';

type ProfileProps = {
  user: any,
}

export default function ProfileInfo({ user }: ProfileProps) {
  const [optionalEdit, setOptionalEdit] = useState<Edit>(Edit.none);
  const [personalEdit, setPersonalEdit] = useState<Edit>(Edit.none);
  const [availabilityEdit, setAvailabilityEdit] = useState<Edit>(Edit.none);

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