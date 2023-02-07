import {combineReducers, configureStore} from '@reduxjs/toolkit';

import authReducer from './slices/auth.slice';
import positionReducer from './slices/position.slice';
import skillReducer from './slices/skill.slice';

const rootReducer = combineReducers({
    authReducer,
    positionReducer,
    skillReducer
})

export const setupStore = () => configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];