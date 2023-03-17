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
}

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

// Scheduler Types
type fMappedEl = {
    sunday: Array<object>,
    monday: Array<object>,
    tuesday: Array<object>,
    wednesday: Array<object>,
    thursday: Array<object>,
    friday: Array<object>,
    saturday: Array<object>,
}

type mappedEl = {
    createdAt: Date,
    updatedAt: Date,
    publishedAt: Date,
    start_time: string,
    end_time: string,
    day: string,
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

export type { 
    AccountType,
    OptionalQuestions,
    IndexType,
    fMappedEl,
    mappedEl,
    EditFnProp
};