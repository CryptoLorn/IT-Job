import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { PositionsController } from './positions.controller';
import { PositionsService } from './positions.service';
import { User } from '../users/user.model';
import { Position } from './positions.model';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../users/user.module';

@Module({
    controllers: [PositionsController],
    providers: [PositionsService],
    imports: [
        SequelizeModule.forFeature([User, Position]),
        forwardRef(() => AuthModule),
        UserModule
    ]
})
export class PositionsModule {}
