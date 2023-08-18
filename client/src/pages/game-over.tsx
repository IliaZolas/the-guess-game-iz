import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { config } from '../config/config';
import "./game.css"
import { PrimaryButton } from "../components/buttons";

const GameOver: React.FC = () => {

    const { user } = useContext(UserContext);

    return (
        <div className="fade-page" style={{ paddingTop: "350px"}}>
            <h1>Game Over</h1>
            <p style={{ paddingBottom: "20px"}}> 
                You win! What do you win? Nothing :D 
            </p>
            <PrimaryButton to={'/game-start'} value="Play Again?"/>
        </div>
    );
}

export default GameOver;
