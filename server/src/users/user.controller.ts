import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';

import {UserService} from './user.service';
import {Roles} from '../auth/rolesAuth.decorator';
import {RoleGuard} from '../auth/role.guard';
import {UpdateUserDto} from './dto/updateUser.dto';
import {SkillsDto} from "../skills/dto/skills.dto";

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @HttpCode(HttpStatus.OK)
    @Roles('ADMIN')
    @UseGuards(RoleGuard)
    @UseGuards(AuthGuard('jwt'))
    @Get()
    getAll() {
        return this.userService.getAll();
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('jwt'))
    @Post('/:id/skills')
    addSkills(@Param('id') id: number, @Body() dto: SkillsDto) {
        return this.userService.addSkills(id, dto);
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('jwt'))
    @Delete('/:id/skills')
    deleteSkills(@Param('id') id: number, @Body() dto: SkillsDto) {
        return this.userService.deleteSkills(id, dto);
    }

    @HttpCode(HttpStatus.OK)
    @Roles('ADMIN')
    @UseGuards(RoleGuard)
    @UseGuards(AuthGuard('jwt'))
    @Post('/:id')
    blockedUser(@Param('id') id: number, @Body() dto: UpdateUserDto) {
        return this.userService.update(id, dto);
    }
}
