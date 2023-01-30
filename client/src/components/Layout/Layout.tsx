import React, {FC} from 'react';
import {Link, Outlet} from 'react-router-dom';

import './Layout.css';

const Layout: FC = () => {
    return (
        <>
            <div className={'layout_wrapper'}>
                <Link to={'/'}><h1>Job Offer</h1></Link>
                <div className={'layout_auth_button_wrapper'}>
                    <div className={'login_button'}><Link to={'/login'}>LogIn</Link></div>
                    <div className={'registration_button'}><Link to={'/signup'}>Register</Link></div>
                </div>
            </div>
            <Outlet/>
        </>
    );
};

export default Layout;