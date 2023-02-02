import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { levelEnum } from '../../users/enums/level.enum';
import { englishLevelEnum } from '../enums/englishLevel.enum';

export class CreatePositionDto {
    @IsString({message: 'Title must be string'})
    @IsNotEmpty()
    title: string;

    @IsString({message: 'Level must be string'})
    @IsEnum(levelEnum, {message: 'level must be one of the following values: Junior, Middle, Senior'})
    @IsNotEmpty()
    level: string;

    @IsString({message: 'English level must be string'})
    @IsEnum(englishLevelEnum, {message: 'english level are incorrect'})
    @IsNotEmpty()
    english_level: string;

    @IsNumber()
    userId: number;
}