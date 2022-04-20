import css from './App.module.css';
import {useState} from "react";

import {Game} from "./components";

function App() {
    const [gameVisible, setGameVisible] = useState(false);
    const [namePlayer1, setNamePlayer1] = useState('');
    const [nameComputer, setNameComputer] = useState('');

    const handleSubmit = () => {
        setGameVisible(true)
    };

    const handleChange = (e) => {
        const eventValue = e.target.value;
        const name = e.target.name;

        if (!isNaN(eventValue)) {
            throw new Error(`${name} field cannot be a number`);
        }
        if (!eventValue) {
            throw new Error(`${name} field cannot be empty`);
        }
        if (name === 'player1') {
            setNamePlayer1(eventValue)
        } else {
            setNameComputer(eventValue)
        }
    }
    return (
        <div className={css.main}>
            <h1>Tic tac toe with computer</h1>

            {!gameVisible && (
                <form className={'form'} onSubmit={handleSubmit}>
                    <label htmlFor="player1">Player 1: </label>
                    <input type="text" id='player1' name={'player1'} value={namePlayer1} onChange={handleChange}
                           required/>
                    <br/>
                    <label htmlFor="computer">Computer: </label>
                    <input type="text" id='computer' name={'computer'} value={nameComputer} onChange={handleChange}
                           required/>
                    <br/>
                    <button type={'submit'}>Start game</button>
                </form>
            )}
            {gameVisible && <Game player1={namePlayer1} computer={nameComputer}/>}
        </div>
    );
}

export default App;
