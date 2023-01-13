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

	const [players, setPlayers] = useState([
		{
			id: 1,
			name: 'player 1',
			points: 0,
			health: 10,
			inTokyo: false,
			isTurn: true,
    },
		{
			id: 2,
			name: 'player 2',
			points: 0,
			health: 10,
			inTokyo: false,
			isTurn: false,
    }
	]);

	const rollDice = () => {
		setDice(dice.map(die => {
			let newValue = Math.floor(Math.random() * 5) + 1;
			return {id: die.id, value: newValue};
		}))
	}

	return (
		<>
			<div className='dice-container'>
				{dice.map(die => {
					const {id, value} = die;
					return <Dice key={id} value={value}/>
				})}
				<button onClick={rollDice} className='roll-dice-btn'>Roll dice</button>
			</div>
			<div className='players-container'>
				{players.map(player => {
					if (player.isTurn) {
						return <Player key={player.id} {...player}/>
					}
				})}
			</div>
		</>
	);
}

export default App;
