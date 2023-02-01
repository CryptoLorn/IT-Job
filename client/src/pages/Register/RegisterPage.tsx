import React, {FC, useEffect, useState} from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {useNavigate} from 'react-router-dom';

import './RegisterPage.css';
import { ILoginRegister } from '../../interfaces';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { signUp } from '../../store';

const RegisterPage: FC = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<ILoginRegister>();
    const {error, user} = useAppSelector(state => state.authReducer);
    const [role, setRole] = useState('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user])

    const submit: SubmitHandler<ILoginRegister> = async (user) => {
        dispatch(signUp({...user, role: role}));
    }

    return (
        <div className={'register_page_wrapper'}>
            <form>
                <input type={'email'} placeholder={'Email...'} {...register('email')} />
                <input type={'password'} placeholder={'Password...'} {...register('password')} />
                <span>Register as:</span>
                <div className={'register_page_checkbox'}>
                    Applicant
                    <input type={'checkbox'} checked={role === 'APPLICANT'} onChange={() => setRole('APPLICANT')} />
                    Employer
                    <input type={'checkbox'} checked={role === 'EMPLOYER'} onChange={() => setRole('EMPLOYER')} />
                </div>
                {error && <span className={'register_page_error'}>{error}</span>}
                <div className={'register_page_button'} onClick={handleSubmit(submit)}>SignUp</div>
            </form>
        </div>
    );
};

export default RegisterPage;