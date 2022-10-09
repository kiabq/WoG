interface ViewPropTypes {
    account: {
        error: string | undefined,
        user: string | undefined,
        email: string | undefined,
        avatar: string | undefined,
        availability: { 
            id: number, 
            days: [{ 
                id: number, day: string 
            }]
        } | undefined
    }
    toggleEdit: () => void,
    isEdit?: boolean
}

type EditPropTypes = Partial<ViewPropTypes> & {
    checked: dayObj | undefined
}

type dayObj = {
    sunday: boolean,
    monday: boolean,
    tuesday: boolean,
    wednesday: boolean,
    thursday: boolean,
    friday: boolean,
    saturday: boolean,
}

export function hasKey<O>(obj: O, key: PropertyKey): key is keyof O {
    return key in obj;
}

export type { ViewPropTypes, EditPropTypes, dayObj};
