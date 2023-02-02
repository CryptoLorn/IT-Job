interface IUser {
    id: number;
    email: string;
    level: string;
    english_level: string;
    status: boolean;
}

export type TokensType = {
    access_token: string;
    refresh_token: string;
    user: IUser;
}