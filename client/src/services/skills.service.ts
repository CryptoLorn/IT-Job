import { authAxiosService } from './axios.service';
import { urls } from '../configs';
import { ISkill } from '../interfaces';

export const skillsService = {
    create: (skill: ISkill) => authAxiosService.post<ISkill>(urls.skills, skill).then(value => value.data),
    getAll: () => authAxiosService.get<ISkill[]>(urls.skills).then(value => value.data)
}