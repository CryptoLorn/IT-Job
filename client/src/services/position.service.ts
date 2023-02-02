import { axiosService } from './axios.service';
import { urls } from '../configs';
import { IPosition } from '../interfaces';

export const positionService = {
    getAll: () => axiosService.get<IPosition[]>(urls.positions).then(value => value.data)
}