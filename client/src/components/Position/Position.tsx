import React, {FC} from 'react';

import './Position.css';
import { IPosition } from '../../interfaces';
import {Link} from "react-router-dom";

const Position: FC<{ position: IPosition }> = ({position}) => {
    const {id, title, description, english_level, salary, createdAt} = position;

    return (
        <div className={'position_wrapper'}>
            <div className={'position_header'}>
                <div className={'position_header_title_salary'}>
                    <Link to={id.toString() + `/${title}`}><span>{title}</span></Link>
                    {salary && <div className={'position_header_salary'}>{salary}$</div>}
                </div>
                <div>{createdAt.slice(0, 10)}</div>
            </div>
            {description.length < 100 ? <div className={'position_description'}>{description}<br/>...</div>
            :
                <div className={'position_description'}>{description}</div>
            }
            <div className={'position_english_level'}>{english_level}</div>
        </div>
    );
};

export default Position;