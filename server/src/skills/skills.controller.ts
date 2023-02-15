import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { SkillsService } from './skills.service';
import { SkillsDto } from './dto/skills.dto';
import { Roles } from '../auth/rolesAuth.decorator';
import { RoleGuard } from '../auth/role.guard';

@Controller('skills')
export class SkillsController {
    constructor(private skillsService: SkillsService) {}

    @HttpCode(HttpStatus.OK)
    @Roles('ADMIN')
    @UseGuards(RoleGuard)
    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(@Body() skillsDto: SkillsDto) {
        return this.skillsService.create(skillsDto);
    }
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('jwt'))
    @Get()
    getAll() {
        return this.skillsService.getAll();
    }
}
