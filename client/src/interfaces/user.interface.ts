import { IPosition } from './position.interface';
import { IRole } from './role.interface';
import { ISkill } from './skill.interface';

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