import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { config } from '../config/config';
import "./game.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleLeft, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import Cookies from "universal-cookie";
const cookies = new Cookies();

const URL = config.url;

const Game: React.FC = () => {

    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const params = useParams<{ id: string }>();



    return (
        <div className="show-book-container fade-page">
            
        </div>
    );
}

export default Game;
