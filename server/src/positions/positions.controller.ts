import {Body, Controller, HttpCode, HttpStatus, Get, Post, UseGuards, Param} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { PositionsService } from './positions.service';
import { CreatePositionDto } from './dto/createPosition.dto';
import { RoleGuard } from '../auth/role.guard';
import { Roles } from '../auth/rolesAuth.decorator';
import {SkillsDto} from "../skills/dto/skills.dto";

@Controller('positions')
export class PositionsController {
    constructor(private positionsService: PositionsService) {}

    @HttpCode(HttpStatus.OK)
    @Roles('ADMIN', 'EMPLOYER')
    @UseGuards(RoleGuard)
    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(@Body() dto: CreatePositionDto) {
        return this.positionsService.create(dto);
    }

    @Get()
    getAll() {
        return this.positionsService.getAll();
    }

    @Post('/:id/skills')
    addSkills(@Param('id') id: number, @Body() dto: SkillsDto) {
        return this.positionsService.addSkills(id, dto);
    }
}
