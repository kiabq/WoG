// Account Types
type AccountType = {
    error: string | undefined,
    user: string | undefined,
    email: string | undefined,
    avatar: string | undefined,
    availability: any, // Add appropriate type
    name: string | undefined,
    dob: string | undefined,
    invoiceEmail: string | undefined,
    pronoun?: string | undefined
}

type FormIterateType = {
    [key: string]: { value: Function } | HTMLInputElement
}

// Edit Types
type EditFnProp = {
    toggleEdit: (val: Edit) => void
}

export const enum Edit {
    none = 0,
    player = 1,
    availability = 2
}

// Helper function used to determine if a provided key is indeed an index 
// of the provided object.
// https://dev.to/mapleleaf/indexing-objects-in-typescript-1cgi
export function hasKey<O>(obj: O, key: PropertyKey): key is keyof O {
    return key in obj;
}

export type { 
    AccountType,
    FormIterateType,
    EditFnProp
};