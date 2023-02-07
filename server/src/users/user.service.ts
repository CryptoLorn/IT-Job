import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcryptjs';

import { CreateUserDto } from './dto/createUser.dto';
import { User } from './user.model';
import { UpdateUserDto } from './dto/updateUser.dto';
import { AuthDto } from '../auth/dto/auth.dto';
import { SkillsService } from '../skills/skills.service';
import { SkillsDto } from '../skills/dto/skills.dto';
import { Skills } from '../skills/skills.model';
import { Position } from '../positions/positions.model';

@Injectable()
export class UserService {
    constructor(@InjectModel(User)
                private userRepository: typeof User,
                private skillsService: SkillsService) {}

    async createUser(userDto: CreateUserDto) {
        const candidate = await this.getUserByEmail(userDto.email);

        if (candidate) {
            throw new HttpException('user with this email is already exist', HttpStatus.BAD_REQUEST);
        }

        const isAdmin = await User.findOne({where: {role: 'ADMIN'}});

        if (isAdmin && userDto.role === 'ADMIN') {
            throw new HttpException('Failed to register', HttpStatus.BAD_REQUEST);
        }

        const hashPassword = await bcrypt.hash(userDto.password, 7);

        let user;
        if (isAdmin) {
            user = await this.userRepository.create({...userDto, password: hashPassword});
        } else {
            user = await this.userRepository.create({...userDto, password: hashPassword, role: 'ADMIN'});
        }

        return user;
    }

    async getAll() {
        return await this.userRepository.findAll({include: {all: true}});
    }

    async getUserByEmail(email: string) {
        return await this.userRepository.findOne({where: {email}, include: [
                {model: Skills},
                {model: Position}
            ]});
    }

    async getUserById(id: number) {
        return await this.userRepository.findOne({where: {id}, include: [
                {model: Skills},
                {model: Position}
            ]});
    }

    async update(id: number, dto: UpdateUserDto) {
        return await this.userRepository.update(dto, {where: {id}});
    }

    async addSkills(id: number, dto: SkillsDto) {
        const user = await this.userRepository.findOne({where: {id}});
        const skill = await this.skillsService.getSkillsByValue(dto.value);

        if (!user || !skill) {
            throw new HttpException('Not found user or skills', HttpStatus.NOT_FOUND);
        }

        await user.$add('skills', skill.id);

        return dto;
    }

    async deleteSkills(id: number, dto: SkillsDto) {
        const user = await this.userRepository.findOne({where: {id}});
        const skills = await this.skillsService.getSkillsByValue(dto.value);

        if (!user || !skills) {
            throw new HttpException('Not found user or skills', HttpStatus.NOT_FOUND);
        }

        await user.$remove('skills', skills.id);

        return dto;
    }

    async checkIsUserPresent(userDto: AuthDto) {
        const user = await this.getUserByEmail(userDto.email);

        if (!user) {
            throw new NotFoundException({message: 'Not found user with this email'});
        }

        const passwordEquals = await bcrypt.compare(userDto.password, user.password);

        if (!passwordEquals) {
            throw new UnauthorizedException({message: 'Invalid email or password'});
        }

        return user;
    }
}
