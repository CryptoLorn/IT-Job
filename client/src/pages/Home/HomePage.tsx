import React, { FC } from 'react';

import './HomePage.css';
import Positions from '../../components/Positions/Positions';
import Pages from '../../components/Pages/Pages';

const HomePage: FC = () => {

    return (
        <div className={'home_page_wrapper'}>
            <div className={'home_page'}>
                <Positions />
                <Pages />
            </div>
        </div>
    );
};

export default HomePage;