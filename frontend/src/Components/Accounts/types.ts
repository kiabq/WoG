// Account Types
type AccountType = {
    error: string | undefined,
    user: string | undefined,
    email: string | undefined,
    avatar: string | undefined,
    availability: any, // Add appropriate type
    user_info: UserInfo | undefined,
    optional: OptionalQuestions,
}

type OptionalQuestions = {
    experience: number,
    combat: number,
    simulation: number,
    exploration: number,
    interactions: number,
    resources: number,
    character_development: number
} | null

type UserInfo = {
    name: string,
    age: number,
    invoiceEmail: string,
    pronoun: string
}

// Form Types

type IndexType<T> = {
    [key: string]: T
}

// Edit Types
type EditFnProp = {
    toggleEdit: (val: Edit) => void,
}

export const enum Edit {
    none = 0,
    player = 1,
    availability = 2,
    optional = 3
}

export const enum RequestCategory {
    user_info = 1,
    optionalQuestions = 2
}

// Helper function used to determine if a provided key is indeed an index 
// of the provided object.
// https://dev.to/mapleleaf/indexing-objects-in-typescript-1cgi
export function hasKey<O>(obj: O, key: PropertyKey): key is keyof O {
    return key in obj;
}

export type { 
    AccountType,
    OptionalQuestions,
    IndexType,
    EditFnProp
};