import Die from './Die';

const Dice = ({dice, setDice}) => {
	return (
		<div className='dice-container'>
			{dice.map(die => {
				const {id, value} = die;
				return <Die 
					key={id} 
					id={id} 
					dieValue={value} 
					dice={dice} 
					setDice={setDice}
				/>
			})}
		</div>
	)
}

export default Dice;