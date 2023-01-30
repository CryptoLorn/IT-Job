import {IsNumber, IsString} from 'class-validator';

export class TokensDto {
    @IsNumber()
    readonly userId: number;

    @IsString()
    readonly access_token: string;

    @IsString()
    readonly refresh_token: string;
}