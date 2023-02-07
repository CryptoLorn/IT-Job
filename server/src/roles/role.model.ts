// import {BelongsToMany, Column, DataType, Model, Table} from 'sequelize-typescript';
//
// import {User} from '../users/user.model';
// import {UserRole} from './userRole.model';
// import {roleEnum} from './enums/role.enum';
//
// interface RoleCreationAttributes {
//     value: string;
// }
//
// @Table({tableName: 'roles'})
// export class Role extends Model<Role, RoleCreationAttributes> {
//     @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
//     id: number;
//
//     @Column({type: DataType.ENUM({values: roleEnum}), unique: true, allowNull: false})
//     value: string;
//
//     @Column({type: DataType.BOOLEAN, defaultValue: true})
//     status: boolean;
//
//     @BelongsToMany(() => User, () => UserRole)
//     user: User[];
// }