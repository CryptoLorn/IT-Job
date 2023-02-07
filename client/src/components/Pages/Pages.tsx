import React from 'react';

import './Pages.css';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setPage } from '../../store';

const Pages = () => {
    const {page} = useAppSelector(state => state.pageReducer);
    const {totalCount} = useAppSelector(state => state.positionReducer);
    const dispatch = useAppDispatch();

    let limit = 9;
    const pageCount = Math.ceil(totalCount / limit);
    const pages = [];

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1);
    }

    return (
        <div className={'pagination'}>
            {pages.map(currentPage =>
                <div
                    className={currentPage === page? 'active_page' : 'pagination_item'}
                    key={currentPage}
                    onClick={() => dispatch(setPage(currentPage))}
                >
                    {currentPage}
                </div>
            )}
        </div>
    );
};

export default Pages;