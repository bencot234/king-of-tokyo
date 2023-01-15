import './App.css';
import Die from './Die';
import Dice from './Dice';
import Player from './Player';
import { useState } from 'react';


function App() {
	const [dice, setDice] = useState([
		{id: 1, value: 1, selected: false},
		{id: 2, value: 1, selected: false},
		{id: 3, value: 1, selected: false},
		{id: 4, value: 1, selected: false},
		{id: 5, value: 1, selected: false},
		{id: 6, value: 1, selected: false},
	]);

	const [currentPlayerId, setCurrentPlayerId] = useState(1);

	const [players, setPlayers] = useState([
		{
			id: 1,
			name: 'player 1',
			points: 0,
			health: 10,
			inTokyo: true,
			isTurn: true,
		},
		{
			id: 2,
			name: 'player 2',
			points: 0,
			health: 10,
			inTokyo: false,
			isTurn: false,
		},
		{
			id: 3,
			name: 'player 3',
			points: 0,
			health: 10,
			inTokyo: false,
			isTurn: false,
		},
	]);

	const rollDice = () => {
		setDice(dice.map(die => {
			let newValue = Math.floor(Math.random() * 5) + 1;
			if (!die.selected) {
				return {...die, value: newValue};
			}
			return die;
		}))
	}

	const handleSubmit = () => {
		const [currentPlayer] = players.filter((player) => player.id === currentPlayerId);
		let updatedPlayers = players;
		if (currentPlayer.inTokyo) {
			updatedPlayers = players.map((player) => {
				if (player.id === currentPlayerId) {
					return {...player, points: player.points + pointsGained()};
				}
				return {...player, health: player.health - damageDealt()};
			})
		} else if (!currentPlayer.inToyko) {
			updatedPlayers = players.map((player) => {
				if (player.id === currentPlayerId) {
					return {...player, points: player.points + pointsGained()};
				}
				if (player.inTokyo) {
					return {...player, health: player.health - damageDealt()};
				}
				return player;
			})
		}
		setPlayers(updatedPlayers);
		nextPlayer();
	}

	const nextPlayer = () => {
		if (currentPlayerId === players.length) {
			setCurrentPlayerId(1);
		} else {
			setCurrentPlayerId(currentPlayerId => currentPlayerId + 1)
		}
	}

	const damageDealt = () => {
		let damageDealt = 0;
		dice.map(die => {
			if (die.value === 5) damageDealt += 1;
		});
		return damageDealt;
	}

	const pointsGained = () => {
		let pointsGained = 0;
		let totalOnes = 0;
		let totalTwos = 0;
		let totalThrees = 0;
	
		dice.map(die => {
			if (die.value === 1) totalOnes += 1;
			if (die.value === 2) totalTwos += 1;
			if (die.value === 3) totalThrees += 1;
		})
		if (totalOnes >= 3) pointsGained += (totalOnes - 2);
		if (totalTwos >= 3) pointsGained += (totalTwos - 1);
		if (totalThrees >= 3) pointsGained += totalThrees;

		return pointsGained;
	}

	return (
		<div className='app-container'>
			<Dice dice={dice} setDice={setDice}/>
			<div className='btn-container'>
				<button onClick={rollDice} className='btn roll-dice-btn'>Roll dice</button>
				<button className='btn submit-btn' onClick={handleSubmit}>Submit</button>
			</div>
			<div className='players-container'>
				{players.map(player => {
					player.isTurn = player.id === currentPlayerId;
					return <Player key={player.id} {...player}/>
				})}
			</div>
		</div>
	);
}

export default App;
