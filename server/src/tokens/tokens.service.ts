import {Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {JwtService} from '@nestjs/jwt';

import {Tokens} from './tokens.model';
import {User} from '../users/user.model';
import {TokensDto} from './dto/tokens.dto';

@Injectable()
export class TokensService {
    constructor(@InjectModel(Tokens)
                private tokenRepository: typeof Tokens,
                private jwtService: JwtService) {}

    async generateTokens(user: User) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.sign(
                {
                    sub: user.id,
                    email: user.email,
                    level: user.level
                },
                {
                    secret: 'at-secret',
                    expiresIn: '24h'
                }),

            this.jwtService.sign(
                {
                    sub: user.id,
                    email: user.email,
                    level: user.level
                },
                {
                    secret: 'rt-secret',
                    expiresIn: '30d'
                })
        ])

        return {
            access_token: accessToken,
            refresh_token: refreshToken
        }
    }

    async saveTokens(tokens: TokensDto) {
        const tokensData = await this.tokenRepository.findOne({where: {userId: tokens.userId}});

        if (tokensData) {
            tokensData.access_token = tokens.access_token;
            tokensData.refresh_token = tokens.refresh_token;
            return tokensData.save();
        }

        return this.tokenRepository.create(tokens);
    }

    async findOneByToken(refreshToken: string) {
        const tokenFromDB = await this.tokenRepository.findOne({where: {refresh_token: refreshToken}});

        if (!tokenFromDB) {
            throw new UnauthorizedException({message: 'Unauthorized'});
        }

        return tokenFromDB;
    }

    async deleteTokens(refreshToken: string) {
        if (!refreshToken) {
            throw new UnauthorizedException({message: 'Unauthorized'});
        }

        return await this.tokenRepository.destroy({where: {refresh_token: refreshToken}});

    }
}
