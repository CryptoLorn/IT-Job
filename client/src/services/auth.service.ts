import { axiosService } from './axios.service';
import { urls } from '../configs';
import { IAuth, ILoginRegister } from '../interfaces';

export const authService = {
    login: (user: ILoginRegister) => axiosService.post<IAuth>(urls.login, user).then(value => {
        return value.data;
    }),

    signUp: (user: ILoginRegister) => axiosService.post<IAuth>(urls.signup, user).then(value => {
        return value.data;
    }),

    checkIsAuth: () => axiosService.get<IAuth>(urls.refresh).then(value => {
        return value.data;
    }),

    logOut: () => axiosService.post<void>(urls.logout)
}