import {IPosition} from "./position.interface";

export interface IUser {
    id: number;
    email: string;
    password: string;
    level: string | null;
    english_knowledge: boolean;
    status: boolean;
    positions: IPosition[];
    roles: IRole[];
    skills: ISkill[];
}

export interface IRole {
    id: number;
    value: string;
    status: boolean;
}

export interface ISkill {
    id: number;
    value: string;
}