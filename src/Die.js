import { AiFillHeart } from 'react-icons/ai';
import { FaPaw } from 'react-icons/fa';
import { useGlobalContext } from './context';

const Die = ({id, value, selected}) => {
    const { selectDie, numRolls } = useGlobalContext();
 
    const displayValue = (value) => {
        if (value === 4) value = <AiFillHeart/>
		if (value === 5) value = <FaPaw/>
        return value;
    }

    return <button
        disabled={numRolls === 3}
        className={`dice ${selected ? 'die-selected' : ''}`}
        onClick={() => selectDie(id)}
    >
        <p className='dice-number'>{displayValue(value)}</p>
    </button>;
}

export default Die;