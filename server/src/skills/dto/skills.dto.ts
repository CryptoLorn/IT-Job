import { IsEnum, IsString } from 'class-validator';

import { skillsEnum } from '../enums/skills.enum';

export class SkillsDto {
    @IsString({message: 'value must be string'})
    @IsEnum(skillsEnum, {message: 'skills are incorrect'})
    readonly value: string;
}