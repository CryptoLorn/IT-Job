import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { IAddSkills, IPosition, ISkill } from '../../interfaces';
import { positionService } from '../../services';

interface IPositionState {
    positions: IPosition[];
    position: IPosition | null;
    totalCount: number;
    error: null;
}

const initialState: IPositionState = {
    positions: [],
    position: null,
    totalCount: 0,
    error: null
}

export const getAllPosition = createAsyncThunk<IPosition[] | void>(
    'positionSlice/getAllPosition',
    async (_, {dispatch, rejectWithValue}) => {
        try {
            await positionService.getAll(9, 1).then(data => {
                dispatch(setPositions({positions: data.rows}));
                dispatch(setTotalCount({totalCount: data.count}));
            });
        } catch (e) {
            const err = e as AxiosError;

            return rejectWithValue(err.response?.data);
        }
    }
)

export const getAllWithParamsPosition = createAsyncThunk<IPosition[] | void, {limit: number, page: number}>(
    'positionSlice/getAllWithParamsPosition',
    async (data, {dispatch, rejectWithValue}) => {
        try {
            await positionService.getAll(data.limit, data.page).then(data => {
                dispatch(setPositions({positions: data.rows}));
                dispatch(setTotalCount({totalCount: data.count}));
            });
        } catch (e) {
            const err = e as AxiosError;

            return rejectWithValue(err.response?.data);
        }
    }
)

export const createPosition = createAsyncThunk<void, IPosition>(
    'positionSlice/createPosition',
    async (position, {dispatch, rejectWithValue}) => {
        try {
            await positionService.createPosition(position).then(data => {
                dispatch(addPosition({position: data}));
                dispatch(setPosition({position: data}));

                if (data) {
                    dispatch(setPositionError(null));
                }
            })
        } catch (e) {
            const err = e as AxiosError;

            return rejectWithValue(err.response?.data);
        }
    }
)

export const addSkills = createAsyncThunk<void, IAddSkills>(
    'positionSlice/addSkills',
    async (data, {dispatch, rejectWithValue}) => {
        try {
            await positionService.addSkills(data.id, data.skill).then(data => {
                dispatch(addPositionSkill({skill: data}));
            })
        } catch (e) {
            const err = e as AxiosError;

            return rejectWithValue(err.response?.data);
        }
    }
)

const positionSlice = createSlice({
    name: 'positionSlice',
    initialState,
    reducers: {
        setPositions: (state, action: PayloadAction<{ positions: IPosition[]}>) => {
            state.positions = action.payload.positions;
        },
        setPosition: (state, action: PayloadAction<{position: IPosition}>) => {
            state.position = action.payload.position;
        },
        addPosition: (state, action: PayloadAction<{position: IPosition}>) => {
            state.positions.push(action.payload.position);
        },
        setPositionError: (state, action) => {
            state.error = action.payload;
        },
        addPositionSkill: (state, action: PayloadAction<{skill: ISkill}>) => {
            state.position?.skills.push(action.payload.skill);
        },
        setTotalCount: (state, action: PayloadAction<{totalCount: number}>) => {
            state.totalCount = action.payload.totalCount;
        }
    },
    extraReducers: builder =>
        builder
            .addCase(createPosition.rejected, (state, action) => {
                // @ts-ignore
                state.error = action.payload.message;
            })
})

const positionReducer = positionSlice.reducer;

export default positionReducer;
export const {
    setPositions,
    setPosition,
    addPosition,
    setPositionError,
    addPositionSkill,
    setTotalCount
} = positionSlice.actions;