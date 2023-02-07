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
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllSkill());
    }, [])

    const addPosition: SubmitHandler<IPosition> = async (data) => {
        dispatch(createPosition({...data, userId: user?.id}));
        setNext(true);
    }

    const nextStep = async (data: IAddSkills) => {
        dispatch(addSkills(data));
    }

    if (!error && next) {
        return (
            <div className={'add_position_page_skills_wrapper'}>
                {skills.map(skill =>
                    <div
                        className={'add_position_page_skill'}
                        key={skill.id}
                        onClick={() => nextStep({skill, id: position?.id})}
                    >{skill.value}
                    </div>
                )}
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