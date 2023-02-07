import { ISkill } from './skill.interface';

export interface IPosition {
    id: number;
    title: string;
    salary: number;
    level: string;
    description: string;
    english_level: string;
    status: boolean;
    userId: number | undefined;
    skills: ISkill[];
    createdAt: string;
}