import React, {FC, useEffect} from 'react';

import './Positions.css';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {getAll} from "../../store";
import Position from "../Position/Position";

const Positions: FC = () => {
    const {positions} = useAppSelector(state => state.positionReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAll());
    }, [])

    return (
        <div className={'positions_wrapper'}>
            {positions.map(position => <Position key={position.id} position={position} />)}
        </div>
    );
};

export default Positions;