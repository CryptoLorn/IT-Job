import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import './Pages.css';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setPage } from '../../store';

const Pages = () => {
    const {totalCount} = useAppSelector(state => state.positionReducer);
    const dispatch = useAppDispatch();

    let limit = 9;
    const pageCount = Math.ceil(totalCount / limit);
    const pages = [];

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1);
    }

    const handlePageChange = (event: {}, page: number) => {
        dispatch(setPage(page));
    }

    return (
        <div className={'pagination'}>
            <Stack spacing={2}>
                <Pagination
                    count={pages.length}
                    size='large'
                    variant='outlined'
                    shape='rounded'
                    onChange={handlePageChange}
                />
            </Stack>
        </div>
    );
};

export default Pages;