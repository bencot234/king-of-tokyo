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
    },
		{
			id: 2,
			name: 'player 2',
			points: 0,
			health: 10,
			inTokyo: false,
    }
	])

	return (
		<>
			<div className='dice-container'>
				{dice.map(die => {
					const {id, value} = die;
					return <Dice key={id} value={value}/>
				})}
			</div>
			<div className='players-container'>
				{players.map(player => {
					return <Player key={player.id} {...player}/>
				})}
			</div>
		</>
	);
}

export default App;
