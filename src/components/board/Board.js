import React from 'react';
import css from './Board.module.css'
import {Square} from "../square/Square";

const Board = ({squares, onClick}) => {


    return (
        <div className={css.board}>
            {squares.map((square, index) =>
                <Square key={index} square={square} onClick={() => onClick(index)}/>
            )}

        </div>
    );
};

export {Board};
