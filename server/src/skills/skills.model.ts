import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';

import { User } from '../users/user.model';
import { UserSkills } from './userSkills.model';
import { skillsEnum } from './enums/skills.enum';
import {Position} from "../positions/positions.model";
import {PositionSkills} from "../positions/positionSkills.model";

interface SkillsCreationAttributes {
    value: string;
}

@Table({tableName: 'skills'})
export class Skills extends Model<Skills, SkillsCreationAttributes> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.ENUM({values: skillsEnum}), allowNull: false})
    value: string;

    @BelongsToMany(() => User, () => UserSkills)
    skills: Skills[];

    @BelongsToMany(() => Position, () => PositionSkills)
    category: Skills[];
}