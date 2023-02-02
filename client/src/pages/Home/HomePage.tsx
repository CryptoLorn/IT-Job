import React, {FC} from 'react';

import './HomePage.css';
import Positions from "../../components/Positions/Positions";

const HomePage: FC = () => {
    return (
        <div className={'home_page_wrapper'}>
            <Positions />
        </div>
    );
};

export default HomePage;