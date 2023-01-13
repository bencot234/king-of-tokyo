import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { AiFillHeart } from 'react-icons/ai';

const Player = ({id, name, points, health, inTokyo, isTurn}) => {
    return (
        <div className={`player-container ${isTurn ? 'player-is-turn' : ''}`}>
            <h2>{name}</h2>
            <p><FaStar/> {points}</p>
            <p><AiFillHeart/> {health}</p>
        </div>
    );
}

export default Player;