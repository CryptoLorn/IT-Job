import { IsEnum, IsNumber, IsString } from 'class-validator';

import { roleEnum } from '../../roles/enums/role.enum';

export class AddRoleDto {
    @IsString({message: 'Value must be string'})
    @IsEnum(roleEnum, {message: 'value must be one of the following values: ADMIN, APPLICANT, EMPLOYER'})
    readonly value: string;

    @IsNumber({}, {message: 'userId must be number'})
    readonly userId: number;
}