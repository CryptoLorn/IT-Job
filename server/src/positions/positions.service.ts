import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Position } from './positions.model';
import { CreatePositionDto } from './dto/createPosition.dto';
import { Skills } from '../skills/skills.model';

@Injectable()
export class PositionsService {
    constructor(@InjectModel(Position) private positionRepository: typeof Position) {}

    async create(dto: CreatePositionDto) {
        return await this.positionRepository.create({...dto});
    }

    async getAll() {
        return await this.positionRepository.findAll({include: Skills});
    }
}
