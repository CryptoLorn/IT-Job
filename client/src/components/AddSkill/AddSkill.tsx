import React, { FC, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import './AddSkill.css';
import { ISkill } from '../../interfaces';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { createSkill, getAllSkill } from '../../store';
import Skill from '../Skill/Skill';

const AddSkill: FC = () => {
    const {register, handleSubmit, reset, formState: {errors}} = useForm<ISkill>();
    const {skills, error} = useAppSelector(state => state.skillReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllSkill());
    }, [])

    const addSkill: SubmitHandler<ISkill> = async (value) => {
        dispatch(createSkill(value));
        reset();
    }

    return (
        <div className={'add_skill_wrapper'}>
            <form>
                <input placeholder={'Value...'} {...register('value')}/>
                {error && <span className={'skill_error'}>{error}</span>}
                <div className={'add_skill_button'} onClick={handleSubmit(addSkill)}>Add</div>
            </form>
            <hr/>
            <div>
                {skills.map(skill => <Skill key={skill.id} skill={skill} />)}
            </div>
        </div>
    );
};

export default AddSkill;