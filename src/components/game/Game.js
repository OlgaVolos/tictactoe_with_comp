import React, {useEffect, useState} from 'react';

import {Board} from "../board/Board";
import css from './Game.module.css'
import {calculateWinner, lines} from "../../calculateWinner";

const Game = ({player1, computer}) => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    const [player1Stat, setPlayer1Stat] = useState(0);
    const [computerStat, setComputerStat] = useState(0);

    const winner = calculateWinner(board);


    const computerTurn = (index) => {
        const boardCopy = [...board];

        if (winner || boardCopy[index]) return;

        boardCopy[index] = "O";
        setBoard(boardCopy);
        setXIsNext(!xIsNext)

    }
    const handleClick = (index) => {
        const boardCopy = [...board];

        if (winner || boardCopy[index]) return;

        boardCopy[index] = "X";

        setBoard(boardCopy);
        setXIsNext(!xIsNext)
    };

    const filledLines = (a, b, c) => {
        return lines.filter(squareIndex => {
            const squareValue = squareIndex.map(index => board[index]);
            return JSON.stringify([a, b, c].sort()) === JSON.stringify(squareValue.sort())
        })
    }
    const continuePosition = filledLines('O', null, null);
    const isComputerTurn = board.filter(value => value !== null).length % 2 === 1;

    const emptyIndex = board.map((value, index) => value === null ? index : null)
        .filter(val => val !== null);
    const randomIndex = emptyIndex[Math.ceil(Math.random() * emptyIndex.length)];


    useEffect(() => {
        if (isComputerTurn) {
            const winningPosition = filledLines('O', 'O', null);
            if (winningPosition.length > 0) {
                const winIndex = winningPosition[0].filter(index => board[index] === null)[0];
                computerTurn(winIndex);
                return
            }
            const blockPosition = filledLines('X', 'X', null);
            if (blockPosition.length > 0) {
                const blockIndex = blockPosition[0].filter(index => board[index] === null)[0];
                computerTurn(blockIndex);
                return;
            }
            if (continuePosition.length > 0) {
                const continueIndex = continuePosition[0].filter(index => board[index] === null)[0];
                computerTurn(continueIndex);
                return;
            }

            computerTurn(randomIndex)
        }

    }, [board]);

    const reset = () => {
        if (winner) {
            if (winner === 'X') {
                setPlayer1Stat(player1Stat + 1);
                setXIsNext(true)
            } else {
                setComputerStat(computerStat + 1);
                setXIsNext(!xIsNext);
            }
        }
        setBoard(Array(9).fill(null))
    };

    const score = () => {
        if (player1Stat === 0 && computerStat === 0) {
            return "Start the game";
        } else if (player1Stat > computerStat) {
            return `${player1} is winning!`
        } else if (computerStat > player1Stat) {
            return `${computer} is winning!`
        } else if (player1Stat === computerStat) {
            return `It is DRAW!`
        }
    }


    return (
        <div className={css.game}>
            <Board squares={board} onClick={handleClick}/>
            <div className={css.game_info}>
                <h3>{score()}</h3>
                <div>
                    <p>{`${player1}: ${player1Stat}`}</p>
                    <p>{`${computer}: ${computerStat}`}</p>
                </div>

                <div className={css.button}>
                    <button onClick={reset}>Play again</button>
                    <button onClick={() => window.location.reload()}>Reset game</button>
                </div>
            </div>
        </div>
    );
};

export {Game};
