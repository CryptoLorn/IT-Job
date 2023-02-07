import { IPosition } from './position.interface';
import { IRole } from './role.interface';
import { ISkill } from './skill.interface';

export interface IUser {
    id: number;
    email: string;
    password: string;
    role: string;
    level: string;
    english_knowledge: boolean;
    status: boolean;
    positions: IPosition[];
    skills: ISkill[];
}