import Die from './Die';

const Dice = ({dice, setDice, numRolls}) => {
	return (
		<div className='dice-container'>
			{dice.map(die => {
				const {id, value, selected} = die;
				return <Die 
					key={id} 
					id={id} 
					dieValue={value} 
					dice={dice} 
					setDice={setDice}
					selected={selected}
					numRolls={numRolls}
				/>
			})}
		</div>
	)
}

export default Dice;