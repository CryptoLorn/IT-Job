import {IsBoolean, IsOptional, IsString} from 'class-validator';

export class UpdateUserDto {
    @IsString({message: 'level must be string'})
    @IsOptional()
    readonly level: string;

    @IsBoolean({message: 'english knowledge must be boolean'})
    @IsOptional()
    readonly english_knowledge: boolean;

    @IsBoolean({message: 'status must be boolean'})
    @IsOptional()
    readonly status: boolean;
}