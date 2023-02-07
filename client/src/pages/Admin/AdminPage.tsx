import React, {FC} from 'react';
import {Outlet, useNavigate} from 'react-router-dom';

import './AdminPage.css';

const AdminPage: FC = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className={'admin_page_wrapper'}>
                <div className={'admin_page_button'} onClick={() => navigate('skill')}>Add skills +</div>
            </div>
            <Outlet/>
        </>
    );
};

export default AdminPage;