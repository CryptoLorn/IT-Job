import {Column, DataType, ForeignKey, Model, Table} from 'sequelize-typescript';

import {User} from '../users/user.model';
import {Skills} from './skills.model';


@Table({tableName: 'user_skills', createdAt: false, updatedAt: false})
export class UserSkills extends Model<UserSkills> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @ForeignKey(() => Skills)
    @Column({type: DataType.INTEGER})
    skillsId: number;
}