import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { ILoginRegister, IUser } from '../../interfaces';
import { authService } from '../../services';

interface IAuthState {
    user: IUser | null;
    isAuth: boolean;
    error: null;
}

const initialState: IAuthState = {
    user: null,
    isAuth: false,
    error: null
}

export const login = createAsyncThunk<void, ILoginRegister>(
    'authSlice/login',
    async (user, {dispatch, rejectWithValue}) => {
        try {
            await authService.login(user).then(data => {
                localStorage.setItem('access_token', data.access_token);
                dispatch(setUser({user: data.user}));

                if (data) {
                    dispatch(setError(null));
                }
            })
        } catch (e) {
            const err = e as AxiosError;

            return rejectWithValue(err.response?.data);
        }
    }
)

export const signUp = createAsyncThunk<void, ILoginRegister>(
    'authSlice/signUp',
    async (user, {dispatch, rejectWithValue}) => {
        try {
            await authService.signUp(user).then(data => {
                localStorage.setItem('access_token', data.access_token);
                dispatch(setUser({user: data.user}));

                if (data) {
                    dispatch(setError(null));
                }
            })
        } catch (e) {
            const err = e as AxiosError;

            return rejectWithValue(err.response?.data);
        }
    }
)

export const isAuth = createAsyncThunk<void>(
    'authSlice/isAuth',
    async (_, {dispatch, rejectWithValue}) => {
        try {
            await authService.checkIsAuth().then(data => {
                localStorage.setItem('access_token', data.access_token);
                dispatch(setUser({user: data.user}));
                dispatch(setIsAuth(true));
            })
        } catch (e) {
            const err = e as AxiosError;

            return rejectWithValue(err.response?.data);
        }
    }
)

export const logOut = createAsyncThunk<void>(
    'authSlice/logOut',
    async (_, {dispatch, rejectWithValue}) => {
        try {
            await authService.logOut().then(value => {
                localStorage.removeItem('access_token');
                dispatch(setUser({user: null}));
                dispatch(setIsAuth(false));
            })
        } catch (e) {
            const err = e as AxiosError;

            return rejectWithValue(err.response?.data);
        }
    }
)

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ user: IUser | null}>) => {
            state.user = action.payload.user;
        },
        setIsAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    },
    extraReducers: builder =>
        builder
            .addCase(login.rejected, (state, action) => {
                // @ts-ignore
                state.error = action.payload.message;
        })
            .addCase(signUp.rejected, (state, action) => {
                // @ts-ignore
                state.error = action.payload.message;
            })
})

const authReducer = authSlice.reducer;

export default authReducer;
export const { setUser, setIsAuth, setError } = authSlice.actions;