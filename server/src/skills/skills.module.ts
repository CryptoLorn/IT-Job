import {Module} from '@nestjs/common';

import {SkillsController} from './skills.controller';
import {SkillsService} from './skills.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/user.model";
import {UserSkills} from "./userSkills.model";
import {Skills} from "./skills.model";
import {PositionSkills} from "../positions/positionSkills.model";
import {Position} from "../positions/positions.model";

@Module({
    controllers: [SkillsController],
    providers: [SkillsService],
    imports: [
        SequelizeModule.forFeature([Skills, User, UserSkills, Position, PositionSkills])
    ],
    exports: [
        SkillsService
    ]
})
export class SkillsModule {}
