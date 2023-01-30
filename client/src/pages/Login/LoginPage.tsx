import React, {FC} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';

import './LoginPage.css';
import {IAuth} from '../../interfaces/auth.interface';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {login} from '../../store';

const LoginPage: FC = () => {
    const {register, handleSubmit} = useForm<IAuth>();
    const {user} = useAppSelector(state => state.authReducer);
    const dispatch = useAppDispatch();
    console.log(user)

    const submit: SubmitHandler<IAuth> = async (user) => {
        dispatch(login(user));
    }

    return (
        <div className={'login_page_wrapper'}>
            <form>
                {/*onChange={e => setEmail(e.target.value)}*/}
                <input type={'email'} placeholder={'Email...'} {...register('email')} />
                <input type={'password'} placeholder={'Password...'} {...register('password')} />
                <div className={'login_page_button'} onClick={handleSubmit(submit)}>Login</div>
            </form>
        </div>
    );
};

export default LoginPage;