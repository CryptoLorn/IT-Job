import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { IRole } from '../../interfaces';
import { roleService } from '../../services';

interface IRoleState {
    roles: IRole[];
    error: null;
}

const initialState: IRoleState = {
    roles: [],
    error: null
}

export const create = createAsyncThunk<void, IRole>(
    'roleSlice/create',
    async (role, {dispatch, rejectWithValue}) => {
        try {
            await roleService.create(role).then(data => {
                dispatch(addRole({role: data}))

                if (data) {
                    dispatch(setRoleError(null));
                }
            })
        } catch (e) {
            const err = e as AxiosError;

            return rejectWithValue(err.response?.data);
        }
    }
)

const roleSlice = createSlice({
    name: 'roleSlice',
    initialState,
    reducers: {
        addRole: (state, action: PayloadAction<{ role: IRole}>) => {
            state.roles.push(action.payload.role);
        },
        setRoleError: (state, action) => {
            state.error = action.payload;
        }
    },
    extraReducers: builder =>
        builder
            .addCase(create.rejected, (state, action) => {
                // @ts-ignore
                state.error = action.payload.message;
            })
})

const roleReducer = roleSlice.reducer;

export default roleReducer;
export const { addRole, setRoleError } = roleSlice.actions;