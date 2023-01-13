import './App.css';
import Dice from './Dice';
import Player from './Player';
import { useState } from 'react';

function App() {
	const [dice, setDice] = useState([
		{id: 1, value: 1},
		{id: 2, value: 1},
		{id: 3, value: 1},
		{id: 4, value: 1},
		{id: 5, value: 1},
	]);
	return (
		<>
			<div className='dice-container'>
				{dice.map(die => {
					const {id, value} = die;
					return <Dice key={id} value={value}/>
				})}
			</div>
			<Player/>
		</>
	);
}

export default App;
