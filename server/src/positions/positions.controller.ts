import { Body, Controller, HttpCode, HttpStatus, Get, Post, UseGuards, Param, Query, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { PositionsService } from './positions.service';
import { CreatePositionDto } from './dto/createPosition.dto';
import { RoleGuard } from '../auth/role.guard';
import { Roles } from '../auth/rolesAuth.decorator';
import { SkillsDto } from '../skills/dto/skills.dto';

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
    getAll(@Query('limit') limit: number, @Query('page') page: number) {
        return this.positionsService.getAll(limit, page);
    }

    @Post('/:id/skills')
    addSkills(@Param('id') id: number, @Body() dto: SkillsDto) {
        return this.positionsService.addSkills(id, dto);
    }

    @Delete('/:positionId/:skillId')
    deleteSkills(@Param('positionId') positionId: number, @Param('skillId') skillId: number) {
        return this.positionsService.deleteById(positionId, skillId);
    }
}
