import {forwardRef, Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';

import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {UserModule} from '../users/user.module';
import {AccessTokenStrategy} from './strategies/accessToken.strategy';
import {RefreshTokenStrategy} from './strategies/refreshToken.strategy';
import {TokensModule} from '../tokens/tokens.module';

@Module({
    controllers: [AuthController],
    providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
    imports: [
        forwardRef(() => UserModule),
        JwtModule,
        TokensModule
    ],
    exports: [
        AuthService,
        JwtModule
    ]
})
export class AuthModule {}
