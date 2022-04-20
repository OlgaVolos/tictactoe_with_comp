import React from 'react';

import css from './Sguare.module.css'

const Square = ({square, onClick}) => {
    return (
        <div className={css.square} onClick={onClick}>
            {square}
        </div>
    );
};

export {Square};
