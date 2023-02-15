import React, { FC, useState } from 'react';

import './AddSkillsToPositionPage.css';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { IAddSkills } from '../../interfaces';
import { addSkills, deleteSkills, setPositionSkills } from '../../store';

const AddSkillsToPositionPage: FC = () => {
    const {position, error, positionSkills, deleteSkillError} = useAppSelector(state => state.positionReducer);
    const {skills} = useAppSelector(state => state.skillReducer);
    const [next, setNext] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const nextStepAddSkills = async (data: IAddSkills) => {
        dispatch(addSkills(data));
    }

    const save = () => {
        dispatch(setPositionSkills([]));
        setNext(true);
    }

    if (!error && next) {
        return (
            <div className={'successfully_added'}>
                <h2>Position was successfully added</h2>
            </div>
        )
    }

    return (
        <div className={'add_skill_to_position_wrapper'}>
            <div className={'add_skill_to_position_container_top'}>
                <div className={'add_skill_to_position_container_top_title'}>Skills required for this position:</div>
                <div className={'add_skill_to_position_container'}>
                    {skills.map(skill =>
                        <div
                            className={'add_skill_to_position'}
                            key={skill.id}
                            onClick={() => nextStepAddSkills({skill, id: position?.id})}
                        >{skill.value}
                        </div>
                    )}
                </div>
            </div>
            {error && <span className={'position_page_error'}>{error}</span>}

            <div className={'add_skill_to_position_container_top'}>
                <div className={'add_skill_to_position_container_top_title'}>Selected skills:</div>
                <div className={'add_skill_to_position_container'}>
                    {positionSkills.map(skill =>
                        <div
                            className={'remove_skill'}
                            key={skill.id}
                            onClick={() => dispatch(deleteSkills({id: position?.id, skill}))}
                        >{skill.value}
                        </div>
                    )}
                </div>
            </div>
            {deleteSkillError && <span className={'position_page_error'}>{deleteSkillError}</span>}

            <div className={'add_skill_to_position_button'} onClick={() => save()}>Save</div>
        </div>
    );
};

export default AddSkillsToPositionPage;