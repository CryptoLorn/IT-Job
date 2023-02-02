import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';

import { englishLevelEnum } from '../../positions/enums/englishLevel.enum';

export class UpdateUserDto {
    @IsString({message: 'level must be string'})
    @IsOptional()
    readonly level: string;

    @IsString({message: 'English level must be string'})
    @IsEnum(englishLevelEnum, {message: 'english level are incorrect'})
    @IsOptional()
    readonly english_level: string;

    @IsBoolean({message: 'status must be boolean'})
    @IsOptional()
    readonly status: boolean;
}