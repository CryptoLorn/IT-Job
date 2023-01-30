import {Body, Controller, Get, Param, Post} from '@nestjs/common';

import {RoleService} from './role.service';
import {RoleDto} from './dto/role.dto';

@Controller('roles')
export class RoleController {
    constructor(private roleService: RoleService) {}

    @Post()
    create(@Body() roleDto: RoleDto) {
        return this.roleService.createRole(roleDto);
    }

    @Get('/:value')
    getByValue(@Param('value') value: string) {
        return this.roleService.getRoleByValue(value);
    }
}
