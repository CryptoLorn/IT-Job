import { useEffect, ReactElement} from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from './redux';

interface IChildrenProps {
    children: ReactElement;
}

const RequireAuth = ({children}: IChildrenProps) => {
    const {user} = useAppSelector(state => state.authReducer);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            return navigate('/login');
        } else if (user.role !== 'ADMIN') {
            return navigate('/');
        }
    }, [])

    return children;
};

export default RequireAuth;