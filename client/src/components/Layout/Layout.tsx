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
            <div className={'layout_wrapper'}>
                <div><Link to={'/'}><h1>IT-Job</h1></Link></div>

                {user ?
                    <div>
                        {user.role === 'ADMIN'?
                            <div className={'layout_admin_header_button'}>
                                <Link to={'/admin'}><div className={'admin_button'}>Admin</div></Link>
                                <Link to={'/'}><div className={'logout_button'} onClick={() => dispatch(logOut())}>LogOut</div></Link>
                            </div>
                            :
                            <div>
                                {user.role === 'EMPLOYER'?
                                    <div className={'layout_employer_header_button'}>
                                        <Link to={'/positions'}><div className={'add_position_button'}>Add position</div></Link>
                                        <Link to={'/'}><div className={'logout_button'} onClick={() => dispatch(logOut())}>LogOut</div></Link>
                                    </div>
                                    :
                                    <div><Link to={'/'}><div className={'logout_button'} onClick={() => dispatch(logOut())}>LogOut</div></Link></div>
                                }
                            </div>
                        }
                    </div>
                    :
                    <div>
                        <div className={'layout_wrapper'}>
                            <div className={'layout_auth_button_wrapper'}>
                                <Link to={'/login'}><div className={'login_button'}>LogIn</div></Link>
                                <Link to={'/signup'}><div className={'registration_button'}>Register</div></Link>
                            </div>
                        </div>
                    </div>
                }
            </div>

            <Outlet/>
        </>
    );
};

export default Layout;