import Die from './Die';
import { useGlobalContext } from './context';

const Dice = () => {
	const {dice} = useGlobalContext();

	return (
		<div className='dice-container'>
			{dice.map(die => {
				return <Die 
					key={die.id}
					{...die}
				/>
			})}
		</div>
	)
}

export default Dice;