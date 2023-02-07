import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.model';
import { AuthModule } from '../auth/auth.module';
import { SkillsModule } from '../skills/skills.module';
import { Position } from '../positions/positions.model';

@Module({
    providers: [UserService],
    controllers: [UserController],
    imports: [
        SequelizeModule.forFeature([User, Position]),
        SkillsModule,
        forwardRef(() => AuthModule)
    ],
    exports: [
        UserService
    ]
})
export class UserModule {}
