import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import './AddSkill.css';
import { ISkill } from '../../interfaces';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { createSkill } from '../../store';

const AddSkill = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<ISkill>();
    const {error} = useAppSelector(state => state.skillReducer);
    const dispatch = useAppDispatch();

    const addSkill: SubmitHandler<ISkill> = async (value) => {
        dispatch(createSkill(value));
    }

    return (
        <div className={'skill_wrapper'}>
            <form>
                <input placeholder={'Value...'} {...register('value')}/>
                {error && <span className={'skill_error'}>{error}</span>}
                <div className={'skill_button'} onClick={handleSubmit(addSkill)}>Add</div>
            </form>
        </div>
    );
};

export default AddSkill;