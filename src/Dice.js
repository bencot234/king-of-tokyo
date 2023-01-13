import { AiFillHeart } from 'react-icons/ai';
import { FaPaw } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const Dice = ({id, dieValue, dice, setDice}) => {

    const [dieSelected, setDieSelected] = useState(false);

    useEffect(() => {
        setDice(
            dice.map(die => {
                if (die.id === id) {
                    return {...die, selected: dieSelected};
                }
                return die;
            })
        );
    }, [dieSelected]);
 
    const displayValue = (dieValue) => {
        if (dieValue === 4) dieValue = <AiFillHeart/>
		if (dieValue === 5) dieValue = <FaPaw/>
        return dieValue;
    }

    return <div className={`dice ${dieSelected ? 'die-selected' : ''}`} onClick={() => setDieSelected(!dieSelected)}>
        <p className='dice-number'>{displayValue(dieValue)}</p>
    </div>;
}

export default Dice;