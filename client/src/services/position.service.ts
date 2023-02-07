import { authAxiosService, axiosService } from './axios.service';
import { urls } from '../configs';
import { IPosition, ISkill } from '../interfaces';

interface IPositionData {
    count: number;
    rows: IPosition[];
}

export const positionService = {
    getAll: (limit: number, page: number) =>
        axiosService.get<IPositionData>(urls.positions, {params: {limit, page}})
            .then(value => value.data),

    createPosition: (position: IPosition) =>
        authAxiosService.post<IPosition>(urls.positions, position)
            .then(value => value.data),

    addSkills: (id: number | undefined, skill: ISkill) =>
        authAxiosService.post<ISkill>(`${urls.positions}/${id}/skills`, skill)
            .then(value => value.data)
}