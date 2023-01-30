import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { PositionsService } from './positions.service';
import { CreatePositionDto } from './dto/createPosition.dto';
import { RoleGuard } from '../auth/role.guard';
import { Roles } from '../auth/rolesAuth.decorator';

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
}
