import { axiosService } from './axios.service';
import { urls } from '../configs';
import { ISkill } from '../interfaces';

export const skillsService = {
    create: (skill: ISkill) => axiosService.post<ISkill>(urls.skills, skill).then(value => value.data)
}