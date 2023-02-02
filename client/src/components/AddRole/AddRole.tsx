import React, {FC} from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import './AddRole.css';
import { IRole } from '../../interfaces';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { create } from '../../store';

const AddRole: FC = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<IRole>();
    const {error} = useAppSelector(state => state.roleReducer);
    const dispatch = useAppDispatch();

    const addRole: SubmitHandler<IRole> = async (value) => {
        dispatch(create(value));
    }

    return (
        <div className={'role_wrapper'}>
            <form>
                <input placeholder={'Value...'} {...register('value')}/>
                {error && <span className={'role_error'}>{error}</span>}
                <div className={'role_button'} onClick={handleSubmit(addRole)}>Add</div>
            </form>
        </div>
    );
};

export default AddRole;