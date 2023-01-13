import { AiFillHeart } from 'react-icons/ai';
import { FaPaw } from 'react-icons/fa';

const Dice = ({id, dieValue}) => {
    console.log(dieValue)
    const selectDie = (id) => {
        console.log('selected', id)
    }

    const displayValue = (dieValue) => {
        if (dieValue === 4) dieValue = <AiFillHeart/>
		if (dieValue === 5) dieValue = <FaPaw/>
        return dieValue;
    }

    return <div className='dice' onClick={() => selectDie(id)}>
        <p className='dice-number'>{displayValue(dieValue)}</p>
    </div>;
}

export default Dice;