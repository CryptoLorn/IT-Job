import { Injectable, UnauthorizedException } from '@nestjs/common';

import { CreateUserDto } from '../users/dto/createUser.dto';
import { UserService } from '../users/user.service';
import { TokensType } from './types/tokens.type';
import { AuthDto } from './dto/auth.dto';
import { TokensService } from '../tokens/tokens.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private tokenService: TokensService) {}

    async registration(userDto: CreateUserDto): Promise<TokensType> {
        const user = await this.userService.createUser(userDto);

        const tokens = await this.tokenService.generateTokens(user);
        await this.tokenService.saveTokens({...tokens, userId: user.id});

        return {...tokens, user};
    }

    async login(userDto: AuthDto): Promise<TokensType> {
        const user = await this.userService.checkIsUserPresent(userDto);

        const tokens = await this.tokenService.generateTokens(user);
        await this.tokenService.saveTokens({...tokens, userId: user.id});

        return {...tokens, user};
    }

    async refresh(refreshToken: string): Promise<TokensType> {
        if (!refreshToken) {
            throw new UnauthorizedException({message: 'Unauthorized'});
        }

        const tokenFromDB = await this.tokenService.findOneByToken(refreshToken);
        const user = await this.userService.getUserById(tokenFromDB.userId);

        const tokens = await this.tokenService.generateTokens(user);
        await this.tokenService.saveTokens({...tokens, userId: user.id});

        return {...tokens, user};
    }
}
