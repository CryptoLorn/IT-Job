import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { SkillsService } from './skills.service';
import { SkillsDto } from './dto/skills.dto';

@Controller('skills')
export class SkillsController {
    constructor(private skillsService: SkillsService) {}

    @Post()
    create(@Body() skillsDto: SkillsDto) {
        return this.skillsService.create(skillsDto);
    }

    @Get('/:value')
    getByValue(@Param('value') value: string) {
        return this.skillsService.getSkillsByValue(value);
    }
}
