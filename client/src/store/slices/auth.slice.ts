import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {IUser} from '../../interfaces';
import {IAuth} from "../../interfaces/auth.interface";
import {authService} from "../../services";

interface IAuthState {
    user: IUser | null
}

const initialState: IAuthState = {
    user: null
}

export const login = createAsyncThunk<void, IAuth>(
    'authSlice/login',
    async (data, {dispatch}) => {
        await authService.login(data.email, data.password).then(data => {
            dispatch(setUser({user: data}));
        })
    }
)

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ user: IUser }>) => {
            state.user = action.payload.user;
        }
    }
})

const authReducer = authSlice.reducer;

export default authReducer;
export const {setUser} = authSlice.actions;