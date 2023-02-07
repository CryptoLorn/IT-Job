interface IUser {
    id: number;
    email: string;
    level: string;
    english_level: string;
    status: boolean;
    // password: string
    // roles: IRole[];
    // skills: ISkill[];
    // positions: IPosition[];
    // tokens: IToken;
}

interface IRole {
    id: number;
    value: string;
    status: boolean;
}

interface ISkill {
    id: number;
    value: string;
}

interface IPosition {
    id: number;
    title: string;
    salary: number;
    level: string;
    description: string;
    english_level: string;
    status: boolean;
    userId: number;
}

interface IToken {
    access_token: string;
    refresh_token: string;
}

export type TokensType = {
    access_token: string;
    refresh_token: string;
    user: IUser;
}