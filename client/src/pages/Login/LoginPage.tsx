import React, {FC, useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';

import './LoginPage.css';
import {ILoginRegister} from '../../interfaces';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {login} from '../../store';

const LoginPage: FC = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<ILoginRegister>();
    const {error, user} = useAppSelector(state => state.authReducer);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user])

    const submit: SubmitHandler<ILoginRegister> = async (user) => {
        dispatch(login(user));
    }

    return (
        <div className={'login_page_wrapper'}>
            <form>
                <input type={'email'} placeholder={'Email...'} {...register('email')} />
                <input type={'password'} placeholder={'Password...'} {...register('password')} />
                {error && <span className={'login_page_error'}>{error}</span>}
                <div className={'login_page_button'} onClick={handleSubmit(submit)}>Login</div>
            </form>
        </div>
    );
};

export default LoginPage;