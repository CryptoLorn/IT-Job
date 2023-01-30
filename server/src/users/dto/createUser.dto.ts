import {IsEmail, IsEnum, IsNotEmpty, IsString, Length} from 'class-validator';

import {roleEnum} from '../../roles/enums/role.enum';

export class CreateUserDto {
    @IsString({message: 'Email must be string'})
    @IsEmail({}, {message: 'Invalid email'})
    @IsNotEmpty()
    readonly email: string;

    @IsString({message: 'Password must be string'})
    @Length(4, 16, {message: 'Password must be from 4-16 characters'})
    @IsNotEmpty()
    readonly password: string;

    @IsString({message: 'role must be string'})
    @IsEnum(roleEnum, {message: 'role must be one of the following values: ADMIN, APPLICANT, EMPLOYER'})
    @IsNotEmpty()
    readonly role: string;
}