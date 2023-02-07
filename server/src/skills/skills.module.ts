import {forwardRef, Module} from '@nestjs/common';

import {SkillsController} from './skills.controller';
import {SkillsService} from './skills.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/user.model";
import {UserSkills} from "./userSkills.model";
import {Skills} from "./skills.model";
import {PositionSkills} from "../positions/positionSkills.model";
import {Position} from "../positions/positions.model";
import {AuthModule} from "../auth/auth.module";
import {UserModule} from "../users/user.module";

@Module({
    controllers: [SkillsController],
    providers: [SkillsService],
    imports: [
        SequelizeModule.forFeature([Skills, User, UserSkills, Position, PositionSkills]),
        forwardRef(() => AuthModule),
        forwardRef(() => UserModule)
    ],
    exports: [
        SkillsService
    ]
})
export class SkillsModule {}
