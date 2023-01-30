import React, {FC} from 'react';
import {Route, Routes} from 'react-router-dom';

import Layout from './components/Layout/Layout';
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Login/LoginPage';

const App: FC = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Layout/>}>
                <Route path={'/'} element={<HomePage/>} />
                <Route path={'/login'} element={<LoginPage/>} />
            </Route>
        </Routes>
    );
};

export default App;