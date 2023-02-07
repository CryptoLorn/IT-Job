// import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards} from '@nestjs/common';
//
// import {RoleService} from './role.service';
// import {RoleDto} from './dto/role.dto';
// import {Roles} from "../auth/rolesAuth.decorator";
// import {RoleGuard} from "../auth/role.guard";
// import {AuthGuard} from "@nestjs/passport";
//
// @Controller('roles')
// export class RoleController {
//     constructor(private roleService: RoleService) {}
//
//     @HttpCode(HttpStatus.OK)
//     // @Roles('ADMIN')
//     // @UseGuards(RoleGuard)
//     @UseGuards(AuthGuard('jwt'))
//     @Post()
//     create(@Body() roleDto: RoleDto) {
//         return this.roleService.createRole(roleDto);
//     }
//
//     @Get('/:value')
//     getByValue(@Param('value') value: string) {
//         return this.roleService.getRoleByValue(value);
//     }
// }
