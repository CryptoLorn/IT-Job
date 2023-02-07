import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';

import { Skills } from '../skills/skills.model';
import { Position } from './positions.model';


@Table({tableName: 'position_skills', createdAt: false, updatedAt: false})
export class PositionSkills extends Model<PositionSkills> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => Position)
    @Column({type: DataType.INTEGER})
    positionId: number;

    @ForeignKey(() => Skills)
    @Column({type: DataType.INTEGER})
    skillsId: number;
}