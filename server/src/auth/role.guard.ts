import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable, NotFoundException,
    UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';

import { ROLES_KEY } from './rolesAuth.decorator';
import { UserService } from '../users/user.service';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private jwtService: JwtService,
                private userService: UserService,
                private reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass()
            ])
            if (!requiredRoles) {
                return true;
            }

            const req = context.switchToHttp().getRequest();
            const token = req.headers.authorization.split(' ')[1];

            if (!token) {
                throw new UnauthorizedException({message: 'Unauthorized'});
            }

            const userData = this.jwtService.verify(token, {secret: 'at-secret'});
            const user = await this.userService.getUserByEmail(userData.email);

            if (!user) {
                throw new NotFoundException({message: 'No found user'});
            }

            const isAccess = requiredRoles.includes(user.role);

            if (!isAccess) {
                throw new HttpException('No access', HttpStatus.FORBIDDEN);
            }

            req.user = user;
            return isAccess;
        } catch (e) {
            throw new HttpException('No access', HttpStatus.FORBIDDEN);
        }
    }
}