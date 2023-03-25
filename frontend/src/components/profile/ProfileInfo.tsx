import Image from "next/image";
import React, { SetStateAction, useMemo, useRef, useState } from "react";
import RadioBox from "./RadioBox";
import OptionalInfo from "./OptionalQuestions";

import { Edit, OptionalQuestions } from "@/utils/types";
import axios from "axios";
import PersonalInfo from "./PersonalInfo";
import AvailabilityInfo from "./AvailabilityInfo";

type ProfileProps = {
  user: any,
}

export default function ProfileInfo({ user }: ProfileProps) {
  const [optionalEdit, setOptionalEdit] = useState<Edit>(Edit.none);
  const [personalEdit, setPersonalEdit] = useState<Edit>(Edit.none);
  const [availabilityEdit, setAvailabilityEdit] = useState<Edit>(Edit.none);

  return (
    <>
      <div className='flex mb-16'>
        <PersonalInfo user={user} edit={personalEdit} setEdit={(edit: Edit) => setPersonalEdit(edit)}/>
        <OptionalInfo user={user} edit={optionalEdit} setEdit={(edit: Edit) => setOptionalEdit(edit)}/>
      </div>
      <AvailabilityInfo user={user} edit={availabilityEdit} setEdit={(edit: Edit) => setAvailabilityEdit(edit)}/>
    </>
  );
}