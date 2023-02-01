import React, {FC, useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';

import Layout from './components/Layout/Layout';
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Login/LoginPage';
import {useAppDispatch} from "./hooks";
import {isAuth} from "./store";
import RegisterPage from "./pages/Register/RegisterPage";

const App: FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (localStorage.getItem('access_token')) {
            dispatch(isAuth()).finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [])

    if (loading) {
        return <div>Loading</div>
    }

    return (
        <Routes>
            <Route path={'/'} element={<Layout/>}>
                <Route path={'/'} element={<HomePage/>} />
                <Route path={'/login'} element={<LoginPage/>} />
                <Route path={'/signup'} element={<RegisterPage/>} />
            </Route>
        </Routes>
    );
};

export default App;