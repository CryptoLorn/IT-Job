import React, { FC } from 'react';
import { Link, Outlet } from 'react-router-dom';

import './Layout.css';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logOut } from '../../store';

const Layout: FC = () => {
    const {user} = useAppSelector(state => state.authReducer);
    const dispatch = useAppDispatch();

    return (
        <>
            {user? <div className={'layout_wrapper'}>
                <Link to={'/'}><h1>Job Offer</h1></Link>
                <Link to={'/'}><div className={'logout_button'} onClick={() => dispatch(logOut())}>LogOut</div></Link>
            </div>
            :
                <div className={'layout_wrapper'}>
                    <Link to={'/'}><h1>Job Offer</h1></Link>
                    <div className={'layout_auth_button_wrapper'}>
                        <Link to={'/login'}><div className={'login_button'}>LogIn</div></Link>
                        <Link to={'/signup'}><div className={'registration_button'}>Register</div></Link>
                    </div>
                </div>
            }
            <Outlet/>
        </>
    );
};

export default Layout;