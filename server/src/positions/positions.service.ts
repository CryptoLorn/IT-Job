import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Position } from './positions.model';
import { CreatePositionDto } from './dto/createPosition.dto';
import { Skills } from '../skills/skills.model';
import { SkillsDto } from '../skills/dto/skills.dto';
import { SkillsService } from '../skills/skills.service';

@Injectable()
export class PositionsService {
    constructor(@InjectModel(Position)
                private positionRepository: typeof Position,
                private skillsService: SkillsService) {}

    async create(dto: CreatePositionDto) {
        const position = await this.positionRepository.create({...dto});

        return await this.positionRepository.findOne({where: {id: position.id}, include: Skills});
    }

    async getAll(limit: number, page: number) {
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit;

        return await this.positionRepository.findAndCountAll({limit, offset, include: Skills, distinct: true});
    }

    async addSkills(id: number, dto: SkillsDto) {
        const position = await this.positionRepository.findOne({where: {id}, include: Skills});
        const isSkill = await this.skillsService.getSkillsByValue(dto.value);

        if (!position || !isSkill) {
            throw new HttpException('Not found position or skill', HttpStatus.NOT_FOUND);
        }

        position.skills.forEach(skill => {
            if (skill.value === isSkill.value) {
                throw new HttpException('Skill is already present', HttpStatus.BAD_REQUEST);
            }
        })

        await position.$add('skills', isSkill.id);

        return dto;
    }
}
