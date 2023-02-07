import { authAxiosService, axiosService } from './axios.service';
import { urls } from '../configs';
import { IPosition, ISkill } from '../interfaces';

export const positionService = {
    getAll: () => axiosService.get<IPosition[]>(urls.positions).then(value => value.data),
    createPosition: (position: IPosition) =>
        authAxiosService.post<IPosition>(urls.positions, position)
            .then(value => value.data),
    addSkills: (id: number | undefined, skill: ISkill) =>
        authAxiosService.post<ISkill>(`${urls.positions}/${id}/skills`, skill)
            .then(value => value.data)
}