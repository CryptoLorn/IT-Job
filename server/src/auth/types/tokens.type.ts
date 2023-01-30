interface IUser {
    id: number;
    email: string;
    level: string;
    english_knowledge: boolean;
    status: boolean;
}

export type TokensType = {
    access_token: string;
    refresh_token: string;
    user: IUser;
}