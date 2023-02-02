import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { IPosition } from '../../interfaces';
import { positionService } from '../../services';

interface IPositionState {
    positions: IPosition[];
}

const initialState: IPositionState = {
    positions: []
}
//<void, ILoginRegister>
export const getAll = createAsyncThunk(
    'authSlice/getAll',
    async (_, {dispatch, rejectWithValue}) => {
        try {
            await positionService.getAll().then(data => dispatch(setPositions({positions: data})));
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
        }
    },
    // extraReducers: builder =>
    //     builder
    //         .addCase(login.rejected, (state, action) => {
    //             // @ts-ignore
    //             state.error = action.payload.message;
    //         })
    //         .addCase(signUp.rejected, (state, action) => {
    //             // @ts-ignore
    //             state.error = action.payload.message;
    //         })
})

const positionReducer = positionSlice.reducer;

export default positionReducer;
export const { setPositions } = positionSlice.actions;