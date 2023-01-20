import './App.css';
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
	const [winner, setWinner] = useState(null);
	const [showYieldQuestion, setShowYieldQuestion] = useState(false);
	const [showGame, setShowGame] = useState(false);
	const [players, setPlayers] = useState([]);
	const [prevPlayerIndex, setPrevPlayerIndex] = useState(null);
	const [numRolls, setNumRolls] = useState(3);
	const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
	
	const rollDice = () => {
		setDice(dice.map(die => {
			let newValue = Math.floor(Math.random() * 5) + 1;
			if (!die.selected) {
				return {...die, value: newValue};
			}
			return die;
		}))
		let rollsLeft = numRolls === 0 ? 3 : numRolls - 1;
		setNumRolls(rollsLeft);
	}


	const handleSubmit = () => {
		const player = players.find((player, i) => i === currentPlayerIndex);
		let updatedPlayers = players;
		let currentPlayer = {
			...player, 
			points: player.points += pointsGained(),
			health: player.health += healthGained(player),
		};
		setPrevPlayerIndex(currentPlayerIndex);

		if (currentPlayer.inTokyo) {
			updatedPlayers = players.map((player, i) => {
				if (i === currentPlayerIndex) {
					return currentPlayer;
				}
		
				return {...player, health: player.health - damageDealt()};
			})
		} else if (!currentPlayer.inToyko) {

			if (!tokyoOccupied && damageDealt() > 0) {
				setTokyoOccupied(true);
				currentPlayer = {...currentPlayer, inTokyo: true};
			}
			
			updatedPlayers = players.map((player, i) => {
				if (i === currentPlayerIndex) {
					return currentPlayer;
				}
				if (player.inTokyo) {
					return {...player, health: player.health - damageDealt()};
				}
			
				return player;
			})
			if (tokyoOccupied && damageDealt() > 0) {
				setShowYieldQuestion(true);
			}
		}
		setPlayers(updatedPlayers);
		checkEliminated(updatedPlayers);
		checkWinner(updatedPlayers);
		setNumRolls(3);
		setDice(dice.map(die => {
			return {...die, selected: false};
		}));
	}

	const checkEliminated = (players) => {
		let eliminatedPlayer = players.find(player => player.health <= 0);
		let indexOfEliminated = players.indexOf(eliminatedPlayer);
		if (eliminatedPlayer) {
			setShowYieldQuestion(false);
			setPlayers(players.map((player, i) => {
				if (i === currentPlayerIndex) {
					return {...player, inTokyo: true};
				}
				return player;
			}).filter(player => player.health > 0));
		}
		nextPlayer(indexOfEliminated);
	}

	const checkWinner = (players) => {
		players.map((player, i) => {
			if (player.points >= 10) {
				setCurrentPlayerIndex(i);
				setWinner(player.name);
			}
		});
	}

	useEffect(() => {
		if (players.length === 1) {
			players.find(player => setWinner(player.name));
		}
	}, [players])

	const nextPlayer = (indexOfEliminated = null) => {
		if (indexOfEliminated !== -1) {
			if (indexOfEliminated > currentPlayerIndex) {
				// if you kill someone with an index above yours..
			  	if (indexOfEliminated < players.length -1) {
					// and they are not the last player,
					// proceed as normal to the next index
					setCurrentPlayerIndex(currentPlayerIndex + 1);
				} else if (indexOfEliminated === players.length -1) {
					// if you kill the last player...
					if (currentPlayerIndex === indexOfEliminated -1) {
						// and you're now the last player, set index to 0
						setCurrentPlayerIndex(0);
					} else {
						// if you're not now the last player, add 1 to the current index
						setCurrentPlayerIndex(currentPlayerIndex + 1);
					}
				}
			} else if (currentPlayerIndex === players.length - 1) {
				// if you are the last player
				// whoever you've killed, the next index will be 0
				setCurrentPlayerIndex(0);
			}
			// for anything else, the indexes all move down, so don't need to set the index
		} else {
			if (currentPlayerIndex >= players.length -1) {
				setCurrentPlayerIndex(0);
			} else {
				setCurrentPlayerIndex(currentPlayerIndex + 1);
			}

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

	const healthGained = (player) => {
		if (player.inTokyo || player.health >= 10) return 0;
		let healthGained = 0;
		dice.map(die => {
			if (die.value === 4) healthGained += 1;
		});
		
		return healthGained;
	}

	const handleYield = () => {
		setShowYieldQuestion(false);
		setPlayers(
			players.map((player, i) => {
				if (player.inTokyo) {
					return {...player, inTokyo: false}
				}
				if (i === prevPlayerIndex) {
					return {...player, inTokyo: true}
				}
				return player;
			}) 
		);
	}

	const playerInTokyoName = () => {
		const playerInTokyo = players.find(player => player.inTokyo);
		if (playerInTokyo) {
			return playerInTokyo.name;
		}
		return;
	}

	return (
		<>
			<SelectPlayers setPlayers={setPlayers} players={players} setShowGame={setShowGame}/>
			<Winner name={winner}/>
			<YieldQuestion name={ playerInTokyoName() } showYieldQuestion={showYieldQuestion} setShowYieldQuestion={setShowYieldQuestion} handleYield={handleYield} winner={winner}/>
			<div className={`${showGame ? (!winner ? 'app-container' : 'app-container blur') : 'hide'}`}>
				<Dice dice={dice} setDice={setDice} numRolls={numRolls}/>
				<div className='btn-container'>
					<button onClick={rollDice} className='btn general-btn' disabled={numRolls === 0}>Roll Dice</button>
					<button className='btn submit-btn' disabled={numRolls === 3} onClick={handleSubmit}>Submit</button>
				</div>
				<div className='players-container'>
					{players.map((player, i) => {
						player.isTurn = i === currentPlayerIndex;
						return <Player key={player.id} {...player}/>
					})}
				</div>
				<div className="board">
					<img src={board} alt="king of tokyo board" />
				</div>
			</div>
		</>
	);
}

export default App;
