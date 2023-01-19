import { AiFillHeart } from 'react-icons/ai';
import { FaPaw } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const Die = ({id, dieValue, dice, setDice, selected, numRolls}) => {

    const isSelected = () => {
        setDice(dice => {
            return dice.map(die => {
                if (die.id === id) {
                    return {...die, selected: !selected};
                }
                return die;
            })
        });
    }
 
    const displayValue = (dieValue) => {
        if (dieValue === 4) dieValue = <AiFillHeart/>
		if (dieValue === 5) dieValue = <FaPaw/>
        return dieValue;
    }

    return <button 
        className={`dice ${selected ? 'die-selected' : ''}`} 
        disabled={numRolls === 3} 
        onClick={isSelected}
    >
        <p className='dice-number'>{displayValue(dieValue)}</p>
    </button>;
}

export default Die;