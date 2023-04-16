export const enum Edit {
    none = 0,
    editing = 1,
}

export const enum RequestCategory {
    user_info = 1,
    optionalQuestions = 2
}

export type OptionalQuestions = {
    id: number,
    experience: number,
    combat: number,
    simulation: number,
    exploration: number,
    interactions: number,
    resources: number,
    character_development: number
}

// Form Types
export type IndexType<T> = {
    [key: string]: T
}

export type AvailableDay = {
    id: number,
    start_time: string,
    end_time: string
}

export interface IUser {
    id: number,
    blocked: boolean,
    confirmed: boolean,
    createdAt: string,
    updatedAt: string,
    isNew: boolean,
    username: string,
    provider: string,
    providerId: string,
    email: string,
    avatar: string,
    sunday: AvailableDay,
    monday: AvailableDay,
    tuesday: AvailableDay,
    wednesday: AvailableDay,
    thursday: AvailableDay,
    friday: AvailableDay,
    saturday: AvailableDay,
    user_info: any,
    optionalQuestions: any
}

export interface IDungeonMaster {}

