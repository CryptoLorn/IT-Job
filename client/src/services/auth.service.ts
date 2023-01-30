import {axiosService} from './axios.service';
import {urls} from '../configs';

export const authService = {
    login: (email: string, password: string) => axiosService.post(urls.login, {email, password}).then(value => {
        localStorage.setItem('access_token', value.data.access_token);
        return value.data.user;
    })
}