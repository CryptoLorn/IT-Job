import { BelongsToMany, Column, DataType, HasMany, HasOne, Model, Table } from 'sequelize-typescript';

import { Role } from '../roles/role.model';
import { UserRole } from '../roles/userRole.model';
import { levelEnum } from './enums/level.enum';
import { Skills } from '../skills/skills.model';
import { UserSkills } from '../skills/userSkills.model';
import { Tokens } from '../tokens/tokens.model';
import { Position } from '../positions/positions.model';

interface UserCreationAttributes {
    email: string;
    password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttributes> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @Column({type: DataType.ENUM({values: levelEnum})})
    level: string;

    @Column({type: DataType.BOOLEAN, defaultValue: false})
    english_knowledge: boolean;

    @Column({type: DataType.BOOLEAN, defaultValue: true})
    status: boolean;

    @BelongsToMany(() => Role, () => UserRole)
    roles: Role[];

    @BelongsToMany(() => Skills, () => UserSkills)
    skills: Skills[];

    @HasMany(() => Position)
    positions: Position[];

    @HasOne(() => Tokens)
    tokens: Tokens;
}