import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { levelEnum } from '../../users/enums/level.enum';

export class CreatePositionDto {
    @IsString({message: 'Title must be string'})
    @IsNotEmpty()
    title: string;

    @IsString({message: 'Level must be string'})
    @IsEnum(levelEnum, {message: 'level must be one of the following values: Junior, Middle, Senior'})
    @IsNotEmpty()
    level: string;

    @IsBoolean({message: 'English knowledge must be boolean'})
    english_knowledge: boolean;

    @IsNumber()
    userId: number;
}