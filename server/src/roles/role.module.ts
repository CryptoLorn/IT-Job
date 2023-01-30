import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';

import {RoleService} from './role.service';
import {RoleController} from './role.controller';
import {Role} from './role.model';
import {User} from '../users/user.model';
import {UserRole} from './userRole.model';

@Module({
    providers: [RoleService],
    controllers: [RoleController],
    imports: [
        SequelizeModule.forFeature([Role, User, UserRole])
    ],
    exports: [
        RoleService
    ]
})
export class RoleModule {}
