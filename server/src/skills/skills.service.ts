import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Skills } from './skills.model';
import { SkillsDto } from './dto/skills.dto';

@Injectable()
export class SkillsService {
    constructor(@InjectModel(Skills) private skillsRepository: typeof Skills) {}

    async create(skillsDto: SkillsDto) {
        const skills = await this.skillsRepository.findOne({where: {value: skillsDto.value}});

        if (skills) {
            throw new HttpException('Skills is already exist', HttpStatus.BAD_REQUEST);
        }

        return await this.skillsRepository.create(skillsDto);
    }

    async getAll() {
        return await this.skillsRepository.findAll();
    }

    async getSkillsByValue(value: string) {
        const skills = await this.skillsRepository.findOne({where: {value}});

        if (!skills) {
            throw new NotFoundException('Not found skills');
        }

        return skills;
    }
}
