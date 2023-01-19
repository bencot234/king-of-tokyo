import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { AiFillHeart } from 'react-icons/ai';

const Player = ({id, name, points, health, inTokyo, isTurn}) => {
    return (
        <div className={`player-container ${isTurn ? 'player-is-turn' : ''}`}>
            <h2 className={`${inTokyo ? 'player-in-tokyo' : ''}`}>{name}</h2>
            <p><FaStar className={`${isTurn ? 'star' : ''}`}/> {points}</p>
            <p><AiFillHeart className={`${isTurn ? 'heart' : ''}`}/> {health}</p>
        </div>
    );
}

export default Player;