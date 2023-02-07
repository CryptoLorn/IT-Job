import { IUser } from './user.interface';

export interface IAuth {
    access_token: string;
    refresh_token: string;
    user: IUser;
}