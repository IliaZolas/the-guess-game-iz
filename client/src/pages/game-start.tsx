import React, { useState, useEffect, useContext, FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from '../UserContext';
import { config } from '../config/config';
import "./game.css"

const URL = config.url;

interface Input {
    inputValue: number;
}

const GameStart: React.FC = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const [gameId, setGameId] = useState("");
    const [gameNumber, setGameNumber] = useState<number>();
    const [inputValue, setInputValue] = useState<number>();
    const [guessResult, setGuessResult] = useState<string | null>(null);

    useEffect(() => {
        fetch(`${URL}/start-the-game`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setGameId(data.gameId); 
                setGameNumber(data.gameNumber);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (inputValue === undefined) {
            setGuessResult("Please enter a number.");
        } else if (inputValue < gameNumber!) {
            setGuessResult("Guess is too low");
        } else if (inputValue > gameNumber!) {
            setGuessResult("Guess is too high");
        } else {
            navigate('/game-over');
        }
    };

    return (
        <div className="fade-page" style={{ paddingTop: "350px"}}>
            <h1>Game #{gameId}</h1>
            <p style={{ paddingBottom: "20px"}}> 
                We have picked a number between 1 and 1000. 
                <br/>Now guess what number we picked
            </p>
            <form onSubmit={onSubmit}>
                <input 
                    type="number" 
                    placeholder="Guess number here"
                    onChange={(e) => setInputValue(Number(e.target.value))} 
                />
                {guessResult && <div className="guess-result">{guessResult}</div>}
                <input type="submit" />
            </form>
        </div>
    );
}

export default GameStart;
