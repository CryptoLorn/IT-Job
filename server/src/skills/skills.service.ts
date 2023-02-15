import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Skills } from './skills.model';
import { SkillsDto } from './dto/skills.dto';

@Injectable()
export class SkillsService {
    constructor(@InjectModel(Skills) private skillsRepository: typeof Skills) {}

    async create(skillsDto: SkillsDto) {
        const skill = await this.skillsRepository.findOne({where: {value: skillsDto.value}});

        if (skill) {
            throw new HttpException('Skills is already exist', HttpStatus.BAD_REQUEST);
        }

        return await this.skillsRepository.create(skillsDto);
    }

    async getAll() {
        return await this.skillsRepository.findAll();
    }

    async getSkillByValue(value: string) {
        const skill = await this.skillsRepository.findOne({where: {value}});

        if (!skill) {
            throw new NotFoundException('Not found skills');
        }

        return skill;
    }

    async getSkillById(id: number) {
        const skill = await this.skillsRepository.findOne({where: {id}});

        if (!skill) {
            throw new NotFoundException('Not found skills');
        }

        return skill;
    }
}
