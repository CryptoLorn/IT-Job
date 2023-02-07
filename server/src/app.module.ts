import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {ConfigModule} from '@nestjs/config';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from './users/user.module';
import {User} from './users/user.model';
import {AuthModule} from './auth/auth.module';
import {SkillsModule} from './skills/skills.module';
import {Skills} from './skills/skills.model';
import {UserSkills} from './skills/userSkills.model';
import {Tokens} from './tokens/tokens.model';
import { TokensModule } from './tokens/tokens.module';
import { PositionsModule } from './positions/positions.module';
import {Position} from "./positions/positions.model";
import {PositionSkills} from "./positions/positionSkills.model";

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Skills, UserSkills, Tokens, Position, PositionSkills],
      autoLoadModels: true
    }),
    UserModule,
    AuthModule,
    SkillsModule,
    TokensModule,
    PositionsModule
  ]
})
export class AppModule {}