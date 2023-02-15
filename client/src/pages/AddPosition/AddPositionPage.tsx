import React, { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import './AddPositionPage.css';
import { IPosition } from '../../interfaces';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { createPosition, getAllSkill } from '../../store';

const AddPositionPage: FC = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<IPosition>();
    const {user} = useAppSelector(state => state.authReducer);
    const {position, error} = useAppSelector(state => state.positionReducer);
    const [next, setNext] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllSkill());

        if (!error && next) {
            navigate('/positions-skills');
        }
    }, [position?.skills])

    const addPosition: SubmitHandler<IPosition> = async (data) => {
        dispatch(createPosition({...data, userId: user?.id}));
        setNext(true);
    }

    return (
        <div className={'add_position_page_wrapper'}>

            <form>
                <div><div>Title*</div> <input {...register('title')}/></div>
                <div><div>Salary</div> <input {...register('salary', {valueAsNumber: true})}/></div>
                <div><div>Level*</div> <input {...register('level')}/></div>
                <div><div>English level*</div> <input {...register('english_level')}/></div>
                <div><div>Description</div> <input {...register('description')}/></div>
                {error && <span className={'position_page_error'}>{error}</span>}

                <div className={'add_position_page_button'} onClick={handleSubmit(addPosition)}>Next</div>
            </form>
        </div>
    );
};

export default AddPositionPage;