// Libraries
import { useState } from 'react';

// Components
import PersonalInfo from './PersonalInfo';
import AvailabilityInfo from './AvailabilityInfo';
import OptionalInfo from './OptionalQuestions';

// Context
import { getContext } from '@/context/usercontext';

export default function ProfileInfo() {
  const { user } = getContext();

  return (
    <>
      <div className='flex flex-col mb-16 lg:flex-row'>
        <PersonalInfo user={user}/>
        <AvailabilityInfo user={user}/>
      </div>
      <OptionalInfo user={user}/>
    </>
  );
}