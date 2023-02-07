import React, { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import './AddPositionPage.css';
import { IPosition, IAddSkills} from '../../interfaces';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addSkills, createPosition, getAllSkill } from '../../store';

const AddPositionPage: FC = () => {
    const {register, handleSubmit, reset, formState: {errors}} = useForm<IPosition>();
    const {user} = useAppSelector(state => state.authReducer);
    const {position, error} = useAppSelector(state => state.positionReducer);
    const {skills} = useAppSelector(state => state.skillReducer);
    const [next, setNext] = useState(false);
    const [selectedSkill, setSelectedSkill] = useState<number | null>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllSkill());
    }, [position?.skills])

    const addPosition: SubmitHandler<IPosition> = async (data) => {
        dispatch(createPosition({...data, userId: user?.id}));
        setNext(true);
    }

    const nextStep = async (data: IAddSkills, e: number) => {
        dispatch(addSkills(data));
        setSelectedSkill(e);
    }

    if (!error && next) {
        return (
            <div className={'add_position_page_skills_wrapper'}>
                <div className={'add_position_page_skills_container_top'}>
                    <div className={'add_position_page_skills_container_top_title'}>Skills required for this position:</div>
                    <div className={'add_position_page_skills_container'}>
                        {skills.map((skill, e) =>
                            <div>
                                {selectedSkill === e?
                                    <div
                                        className={'add_position_page_skill_active'}
                                        key={skill.value}
                                    >{skill.value}
                                    </div>
                                    :
                                    <div
                                        className={'add_position_page_skill'}
                                        key={skill.id}
                                        onClick={() => nextStep({skill, id: position?.id}, e)}
                                    >{skill.value}
                                    </div>
                                }
                            </div>
                        )}
                    </div>
                </div>

                <div className={'add_position_page_skills_container_top'}>
                    <div className={'add_position_page_skills_container_top_title'}>Selected skills:</div>
                    <div className={'add_position_page_skills_container'}>
                        {position?.skills.map(skill =>
                            <div
                                className={'remove_position_page_skill'}
                                key={skill.id}
                                onClick={() => 'remove'}
                            >{skill.value}
                            </div>
                        )}
                    </div>
                </div>

                <div className={'add_position_page_skills_button'}>Save</div>
            </div>
        )
    }

    return (
        <div className={'add_position_page_wrapper'}>

            <form>
                <div><div>Title*</div> <input {...register('title')}/></div>
                <div><div>Salary</div> <input {...register('salary')}/></div>
                <div><div>Level*</div> <input {...register('level')}/></div>
                <div><div>English level</div> <input {...register('english_level')}/></div>
                <div><div>Description</div> <input {...register('description')}/></div>
                {error && <span className={'position_page_error'}>{error}</span>}

                <div className={'add_position_page_button'} onClick={handleSubmit(addPosition)}>Next</div>
            </form>
        </div>
    );
};

export default AddPositionPage;