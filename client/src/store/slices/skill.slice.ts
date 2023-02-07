import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { ISkill } from '../../interfaces';
import { skillsService } from '../../services';


interface ISkillState {
    skills: ISkill[];
    error: null;
}

const initialState: ISkillState = {
    skills: [],
    error: null
}

export const getAllSkill = createAsyncThunk<ISkill[] | void>(
    'skillSlice/getAllSkill',
    async (_, {dispatch, rejectWithValue}) => {
        try {
            await skillsService.getAll().then(data => dispatch(setSkill({skills: data})));
        } catch (e) {
            const err = e as AxiosError;

            return rejectWithValue(err.response?.data);
        }
    }
)

export const createSkill = createAsyncThunk<void, ISkill>(
    'skillSlice/createSkill',
    async (skill, {dispatch, rejectWithValue}) => {
        try {
            await skillsService.create(skill).then(data => {
                dispatch(addSkill({skill: data}))

                if (data) {
                    dispatch(setSkillError(null));
                }
            })
        } catch (e) {
            const err = e as AxiosError;

            return rejectWithValue(err.response?.data);
        }
    }
)

const skillSlice = createSlice({
    name: 'skillSlice',
    initialState,
    reducers: {
        setSkill: (state, action: PayloadAction<{ skills: ISkill[]}>) => {
            state.skills = action.payload.skills;
        },
        addSkill: (state, action: PayloadAction<{ skill: ISkill}>) => {
            state.skills.push(action.payload.skill);
        },
        setSkillError: (state, action) => {
            state.error = action.payload;
        }
    },
    extraReducers: builder =>
        builder
            .addCase(createSkill.rejected, (state, action) => {
                // @ts-ignore
                state.error = action.payload.message;
            })
})

const skillReducer = skillSlice.reducer;

export default skillReducer;
export const { setSkill, addSkill, setSkillError } = skillSlice.actions;