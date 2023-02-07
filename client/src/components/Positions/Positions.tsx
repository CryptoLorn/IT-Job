import React, {FC, useEffect} from 'react';

import './Positions.css';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {getAllPosition, getAllWithParamsPosition} from '../../store';
import Position from '../Position/Position';

const Positions: FC = () => {
    const {positions} = useAppSelector(state => state.positionReducer);
    const {page} = useAppSelector(state => state.pageReducer);
    const dispatch = useAppDispatch();

    // useEffect(() => {
    //     dispatch(getAllPosition());
    // }, [])

    useEffect(() => {
        dispatch(getAllWithParamsPosition({limit: 9, page}));
    }, [page])

    return (
        <div className={'positions_wrapper'}>
            {positions.map(position => <Position key={position.id} position={position} />)}
        </div>
    );
};

export default Positions;