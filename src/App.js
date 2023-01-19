import './App.css';
import Die from './Die';
import Dice from './Dice';
import Player from './Player';
import SelectPlayers from './SelectPlayers';
import { useState, useEffect } from 'react';
import { useGlobalContext } from './context';
import Winner from './Winner';
import YieldQuestion from './YieldQuestion';
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

	const [tokyoOccupied, setTokyoOccupied] = useState(false);

	const [showWinner, setShowWinner] = useState(false);
	const [winner, setWinner] = useState(null);
	const [showYieldQuestion, setShowYieldQuestion] = useState(false);

	const [currentPlayerId, setCurrentPlayerId] = useState(1);
	const [showGame, setShowGame] = useState(false);
	const [playerInTokyoId, setPlayerInTokyoId] = useState(null);
	const [playerInTokyoName, setPlayerInTokyoName] = useState(null);
	const [playerInTokyo, setPlayerInTokyo] = useState(null);
	const [players, setPlayers] = useState([]);
	const [currentPlayer, setCurrentPlayer] = useState({});
	const [prevPlayerId, setPrevPlayerId] = useState(null);
	
	const rollDice = () => {
		setDice(dice.map(die => {
			let newValue = Math.floor(Math.random() * 5) + 1;
			if (!die.selected) {
				return {...die, value: newValue};
			}
			return die;
		}))
	}

	useEffect(() => {
		setPlayerInTokyo(players.find(p => p.id === playerInTokyoId));
		setCurrentPlayer(players.find(p => p.id === currentPlayerId))
	}, [playerInTokyoId])


	const handleSubmit = () => {
		const [player] = players.filter((player) => player.id === currentPlayerId);
		let updatedPlayers = players;
		let currentPlayer = {...player, points: player.points + pointsGained()};
		setPrevPlayerId(currentPlayerId);

		if (currentPlayer.inTokyo) {
			updatedPlayers = players.map((player) => {
				if (player.id === currentPlayerId) {
					return currentPlayer;
				}
		
				return {...player, health: player.health - damageDealt()};
			})
		} else if (!currentPlayer.inToyko) {

			if (!tokyoOccupied && damageDealt() > 0) {
				setPlayerInTokyoId(currentPlayerId);
				setTokyoOccupied(true);
				currentPlayer = {...currentPlayer, inTokyo: true};
			}
			if (tokyoOccupied && damageDealt() > 0) {
				setShowYieldQuestion(true);
			}
			updatedPlayers = players.map((player) => {
				if (player.id === currentPlayerId) {
					return currentPlayer;
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

	useEffect(() => {
		checkWinner(players);
	}, [players])

	const checkWinner = (players) => {
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

	const handleYield = () => {
		setShowYieldQuestion(false);
		setPlayers(
			players.map(player => {
				if (player.id === playerInTokyoId) {
					return {...player, inTokyo: false}
				}
				if (player.id === prevPlayerId) {
					return {...player, inTokyo: true}
				}
				return player;
			}) 
		);
		setPlayerInTokyoId(prevPlayerId);
	}

	return (
		<>
			<SelectPlayers setPlayers={setPlayers} players={players} setShowGame={setShowGame}/>
			<Winner name={winner} showWinner={showWinner}/>
			<YieldQuestion name={ playerInTokyo ? playerInTokyo.name : ''} showYieldQuestion={showYieldQuestion} setShowYieldQuestion={setShowYieldQuestion} handleYield={handleYield}/>
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
