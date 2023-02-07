import React, { FC } from 'react';

import './Skill.css';
import { ISkill } from '../../interfaces';

const Skill: FC<{ skill: ISkill }> = ({skill}) => {
    const {value} = skill;

    return (
        <>
            <div className={'skill_wrapper'}>
                <div className={'skill_value'}>{value}</div>
            </div>
        </>
    );
};

export default Skill;