import './App.css';
import Die from './Die';
import Dice from './Dice';
import Player from './Player';
import SelectPlayers from './SelectPlayers';
import { useState, useEffect } from 'react';
import { useGlobalContext } from './context';
import Winner from './Winner';
import board from './images/king-of-tokyo-board.jpeg';

function App() {
	const [dice, setDice] = useState([
		{id: 1, value: 1, selected: false},
		{id: 2, value: 1, selected: false},
		{id: 3, value: 1, selected: false},
		{id: 4, value: 1, selected: false},
		{id: 5, value: 1, selected: false},
		{id: 6, value: 1, selected: false},
	]);

	const [showWinner, setShowWinner] = useState(false);
	const [winner, setWinner] = useState(null);

	const [currentPlayerId, setCurrentPlayerId] = useState(1);
	const [showGame, setShowGame] = useState(false);
	
	const [players, setPlayers] = useState([]);
	// const [currentPlayer, setCurrentPlayer] = useState(players.filter(p => p.id === currentPlayerId));
	
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
		// checkWinner(currentPlayerId);
		nextPlayer();
	}

	useEffect(() => {
		checkWinner(players);
	}, [players])

	const checkWinner = (players) => {
		// const [currentPlayer] = players.filter(player => player.id === currentPlayerId);
		players.map(player => {
			if (player.points >= 20) {
				setCurrentPlayerId(player.id)
				setWinner(player.name);
				setShowWinner(true);
			}
		})
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
		<>
			<SelectPlayers setPlayers={setPlayers} players={players} setShowGame={setShowGame}/>
			<Winner name={winner} showWinner={showWinner}/>
			<div className={`${showGame ? (!winner ? 'app-container' : 'app-container blur') : 'hide'}`}>
				<Dice dice={dice} setDice={setDice}/>
				<div className='btn-container'>
					<button onClick={rollDice} className='btn general-btn'>Roll Dice</button>
					<button className='btn submit-btn' onClick={handleSubmit}>Submit</button>
				</div>
				<div className='players-container'>
					{players.map(player => {
						player.isTurn = player.id === currentPlayerId;
						return <Player key={player.id} {...player}/>
					})}
				</div>
				<div className="board">
					<img src={board} alt="" />
				</div>
			</div>
		</>
	);
}

export default App;
