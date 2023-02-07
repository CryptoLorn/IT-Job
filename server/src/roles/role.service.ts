// import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/sequelize';
//
// import { RoleDto } from './dto/role.dto';
// import { Role } from './role.model';
//
// @Injectable()
// export class RoleService {
//     constructor(@InjectModel(Role) private roleRepository: typeof Role) {}
//
//     async createRole(roleDto: RoleDto) {
//         const role = await this.roleRepository.findOne({where: {value: roleDto.value}});
//
//         if (role) {
//             throw new HttpException('Role is already exist', HttpStatus.BAD_REQUEST);
//         }
//
//         return await this.roleRepository.create(roleDto);
//     }
//
//     async getRoleByValue(value: string) {
//         const role = await this.roleRepository.findOne({where: {value}});
//
//         if (!role) {
//             throw new NotFoundException('Not found role');
//         }
//
//         return role;
//     }
// }
