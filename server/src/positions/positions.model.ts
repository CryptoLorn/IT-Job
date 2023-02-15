import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';

import { User } from '../users/user.model';
import { englishLevelEnum } from './enums/englishLevel.enum';
import { Skills } from '../skills/skills.model';
import { PositionSkills } from './positionSkills.model';

interface PositionCreationAttrs {
    title: string;
    salary: number;
    level: string;
    description?: string;
    english_level: string;
    userId: number;
}

@Table({tableName: 'positions'})
export class Position extends Model<Position, PositionCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @Column({type: DataType.INTEGER})
    salary: string;

    @Column({type: DataType.STRING, allowNull: false})
    level: string;

    @Column({type: DataType.STRING})
    description: string;

    @Column({type: DataType.ENUM({values: englishLevelEnum}), defaultValue: 'Elementary'})
    english_level: string;

    @Column({type: DataType.BOOLEAN, defaultValue: true})
    status: boolean;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @BelongsToMany(() => Skills, () => PositionSkills)
    skills: Skills[];

    @BelongsTo(() => User)
    author: User;
}