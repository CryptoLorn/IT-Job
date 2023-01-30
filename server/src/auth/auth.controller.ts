import {Body, Controller, HttpCode, HttpStatus, Post, Req, Res, UseGuards} from '@nestjs/common';
import {Request, Response} from 'express';
import {AuthGuard} from '@nestjs/passport';

import {CreateUserDto} from '../users/dto/createUser.dto';
import {AuthService} from './auth.service';
import {TokensType} from './types/tokens.type';
import {AuthDto} from './dto/auth.dto';
import {TokensService} from '../tokens/tokens.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService,
                private tokenService: TokensService) {}

    @HttpCode(HttpStatus.CREATED)
    @Post('registration')
    async registration(@Body() userDto: CreateUserDto, @Res({ passthrough: true }) res: Response): Promise<TokensType> {
        const tokens = await this.authService.registration(userDto);

        res.cookie('refresh_token', tokens.refresh_token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});

        return tokens;
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() userDto: AuthDto, @Res({ passthrough: true }) res: Response) {
        const tokens = await this.authService.login(userDto);

        res.cookie('refresh_token', tokens.refresh_token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});

        return tokens;
    }

    @HttpCode(HttpStatus.OK)
    @Post('logout')
    async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const {refresh_token} = req.cookies;

        const token = await this.tokenService.deleteTokens(refresh_token);
        res.clearCookie('refresh_token');

        return token;
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard('jwt-refresh'))
    @Post('refresh')
    async refreshToken(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const {refresh_token} = req.cookies;

        const tokens = await this.authService.refresh(refresh_token);
        res.cookie('refresh_token', tokens.refresh_token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});

        return tokens;
    }
}
