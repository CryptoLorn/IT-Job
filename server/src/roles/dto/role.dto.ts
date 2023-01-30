import {IsEnum, IsString} from 'class-validator';

import {roleEnum} from '../enums/role.enum';

export class RoleDto {
    @IsString({message: 'value must be string'})
    @IsEnum(roleEnum, {message: 'value must be one of the following values: ADMIN, APPLICANT, EMPLOYER'})
    readonly value: string;
}