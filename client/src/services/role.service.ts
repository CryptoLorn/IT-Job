import { axiosService } from './axios.service';
import { urls } from '../configs';
import { IRole } from '../interfaces';

export const roleService = {
    create: (role: IRole) => axiosService.post<IRole>(urls.roles, role).then(value => value.data)
}