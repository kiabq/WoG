import Image from "next/image";
import React, { SetStateAction, useMemo, useState } from "react";
import RadioBox from "./RadioBox";

import { Edit, OptionalQuestions } from "@/utils/types";

type ProfileProps = {
  user: any,
  toggleEdit: SetStateAction<any>,
  editType: Edit,
}

type LoaderArgs = {
  src: string
}

const INITIAL_STATE = {
  id: 0,
  experience: 0,
  combat: 0,
  simulation: 0,
  exploration: 0,
  interactions: 0,
  resources: 0,
  character_development: 0
}

export default function ProfileInfo({ user, toggleEdit, editType }: ProfileProps) {
  const [optional, setOptional] = useState<OptionalQuestions>(user.optionalQuestions ?? INITIAL_STATE);

  const loader = ({ src }: LoaderArgs) => {
    return `https://cdn.discordapp.com/avatars/${user.providerId}/${src}`
  }

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  const questions = [
    [
      "I'm very new to D&D and I'll likely need help learning the game as I'm just getting started.",
      "I've logged some time creating characters and playing through adventures and basically know the ropes.",
      "I'm a D&D veteran who is experienced playing the game and know what I'm doing.",
      "I know my way around the game both as a player and a GM, and have a thorough understanding of the rules."
    ],
    "How do you feel about using game time to engage in grid combat during the game?",
    "How do you feel about using game time to explore immersive elements of the game?",
    "How do you feel about using game time for exploration of areas, dungeons, and game worlds in general?",
    "How do you feel about using game time to explore interactions between characters?",
    "How do you feel about using game time for downtime activities and resource development?",
    "How do you feel about using game time for character development of your own and other player characters?"
  ]

  return (
    <>
      <div className='flex mb-16'>
        <div className='flex flex-col items-center mb-16'>
          <Image
            loader={loader}
            src={`${user.avatar}.png`}
            alt='User&apos;s profile picture'
            width={128}
            height={128}
            className='rounded-full mb-4'
          />
          <form className='flex flex-col max-w-4/5' onSubmit={(e) => submit(e)}>
            <input placeholder='name' />
            <input placeholder='invoice email' />
            <input placeholder='pronouns' />
            <input type='submit' />
          </form>
        </div>

        <form>
          {questions.map((element: string | Array<string>, index: number) => {
            const key = Object.keys(optional).slice(index + 1, index + 2)[0];
            const value = Object.values(optional).slice(index + 1, index + 2)[0];

            if (!Array.isArray(element)) {
              return (
                <section>
                  <span>Not Interested</span>
                  {[1, 2, 3, 4, 5].map((mapped: number) => {
                    return (
                      <input type='radio'
                        name={key}
                        value={mapped}
                        defaultChecked={mapped === value}
                      />
                    )
                  })}
                  <span>Interested</span>
                </section>
              )
            }

            return (
              <section className="flex-col">
                {[1, 2, 3, 4].map((mapped: number, index: number) => {
                  return (
                    <div className='flex'>
                      <input type='radio'
                        name={key}
                        value={mapped}
                        defaultChecked={mapped === value}
                      />
                      <p>{element[index]}</p>
                    </div>

                  )
                })}
              </section>
            )
          })}

          {editType === Edit.optional ?
            <div>
              <button className="btn btn-padding submit">
                Submit
              </button>

              <button type="button" onClick={() => {
                toggleEdit(Edit.none)
                setOptional(optional)
              }} className="btn btn-padding cancel">
                Cancel
              </button>
            </div>
            :
            <button type="button" onClick={() => { toggleEdit(Edit.optional) }} className="btn btn-padding edit">
              Edit
            </button>
          }
        </form>
      </div>

      <div className='flex flex-row w-full h-48 text-center'>
        <div className='grow basis-0'>Sunday</div>
        <div className='grow basis-0'>Monday</div>
        <div className='grow basis-0'>Tuesday</div>
        <div className='grow basis-0'>Wednesday</div>
        <div className='grow basis-0'>Thursday</div>
        <div className='grow basis-0'>Friday</div>
        <div className='grow basis-0'>Saturday</div>
      </div>
    </>
  );
}