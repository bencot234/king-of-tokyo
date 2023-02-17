
const reducer = (state, action) => {

	if (action.type === 'ROLL_DICE') {
		const newDice = state.dice.map(die => {
			let newValue = Math.floor(Math.random() * 5) + 1;
			if (!die.selected) {
				return {...die, value: newValue};
			}
			return die;
		});
		return {
			...state,
			dice: newDice,
		}
	}

	if (action.type === 'PLAY_AGAIN') {
		return {...state, players: state.players.map(player => {
			return {
				...player,
				health: 10,
				points: 0,
			}
		})}
	}

	if (action.type === 'SET_SHOW_GAME') {
		return {...state, showGame: true}
	}

	if (action.type === 'SET_INITIAL_PLAYERS') {
		return {...state, players: action.payload}
	}

	if (action.type === 'SELECT_DIE') {
		const selected_die = state.dice.map(die => {
			if (die.id === action.payload) {
				return {...die, selected: !die.selected};
			}
			return die;
		})
		
		return {...state, dice: selected_die}
	}

	if (action.type === 'REDUCE_ROLLS_LEFT') {
		const rollsLeft = state.numRolls - 1;
		return {
			...state,
			numRolls: rollsLeft,
		}
	}

	if (action.type === 'DESELECT_DICE') {
		const deselectedDice = state.dice.map(die => {
			return {...die, selected: false};
		})
		return {
			...state,
			dice: deselectedDice,
		}
	}

	if (action.type === 'SHOW_MODAL') {
		return {...state, showModal: true, modalMessage: action.payload.message, currentPlayerIndex: action.payload.index}
	}

	if (action.type === 'SET_NEXT_PLAYER') {
		const {indexOfEliminated, currentPlayerIndex, players} = state;
		let nextPlayerIndex = currentPlayerIndex + 1;
		if (indexOfEliminated !== null) {
			if (indexOfEliminated > currentPlayerIndex) {
				// if you kill someone with an index above yours..
			  	if (indexOfEliminated < players.length) {
					// and they are not the last player,
					// proceed as normal to the next index
					nextPlayerIndex = currentPlayerIndex + 1;
				} else if (indexOfEliminated === players.length) {
					// if you kill the last player...
					if (currentPlayerIndex === indexOfEliminated -1) {
						// and you're now the last player, set index to 0
						nextPlayerIndex = 0;
					} else {
						// if you're not now the last player, add 1 to the current index
						nextPlayerIndex = currentPlayerIndex + 1;
					}
				}
			} else if (currentPlayerIndex === players.length - 1) {
				// if you are the last player
				// whoever you've killed, the next index will be 0
				nextPlayerIndex = 0;
			}
		}
		if (currentPlayerIndex >= players.length -1) {
			nextPlayerIndex = 0;
		}

		return {...state, currentPlayerIndex: nextPlayerIndex, indexOfEliminated: null}
	}

	if (action.type === 'RESET_NUM_ROLLS') {
		return {...state, numRolls: 3}
	}

	if (action.type === 'SET_DICE_RESULTS') {
		let ones = 0;
		let twos = 0;
		let threes = 0;
		let points = 0;
		const {damageDealt, healthGained} = state.dice.reduce((total, dice) => {
			if (dice.value === 1) ones += 1;
			if (dice.value === 2) twos += 1;
			if (dice.value === 3) threes += 1;
			if (dice.value === 4) total.healthGained += 1;
			if (dice.value === 5) total.damageDealt += 1;
	
			return total;
		}, {
			damageDealt: 0,
			healthGained: 0,
		})
		if (ones >= 3) points += ones -2;
		if (twos >= 3) points += twos -1;
		if (threes >= 3) points += threes;

		return {
			...state,
			dice: state.dice.map(die => {return {...die, selected: false}}),
			diceResults: {...state.diceResults, points: points, damageDealt: damageDealt, healthGained: healthGained},
		};
	}

	if (action.type === 'UPDATE_PLAYERS') {
		// if it's now the turn of the player in tokyo, add 2 points
		let nextPlayerIndex = state.currentPlayerIndex + 1;
		if (state.currentPlayerIndex === state.players.length -1) {
			nextPlayerIndex = 0;
		}
		const newPlayers = state.players.map((player, i) => {
			if (player.inTokyo && nextPlayerIndex === i) {
				return {...player, points: player.points + 2}
			}
			return player;
		})
		return {
			...state,
			players: newPlayers,
		};
	}

	if (action.type === 'UPDATE_PLAYERS__CURRENT_PLAYER_IN_TOKYO') {
		const updatedPlayers = state.players.map((player, i) => {
			if (i === state.currentPlayerIndex) {
				return {...player, points: player.points + state.diceResults.points};
			}
			return {
				...player,
				health: player.health - state.diceResults.damageDealt
			};
		})
		return {
			...state, 
			players: updatedPlayers,
		}
	}

	if (action.type === 'SET_PLAYER_IN_TOKYO_NAME') {
		const playerInTokyo = state.players.find(player => player.inTokyo);
		if (playerInTokyo) {
			const name = playerInTokyo.name;
			return {...state, playerInTokyoName: name}
		}
		return state;
	}

	if (action.type === 'UPDATE_PLAYERS__CURRENT_PLAYER_OUT_TOKYO') {
		const currentPlayer = state.players.find((player, i) => i === state.currentPlayerIndex);
		const {
			players, 
			diceResults, 
			tokyoOccupied,
			currentPlayerIndex
		} = state;
		
		// UPDATE HEALTH
		let newHealth = currentPlayer.health + diceResults.healthGained;
		if (newHealth > 10) newHealth = 10;

		// UPDATE PLAYER
		let updatedCurrentPlayer = {
			...currentPlayer, 
			points: currentPlayer.points + diceResults.points,
			health: newHealth,
		};

		// YIELD QUESTION
		let setShowYieldModal = false;
		if (state.tokyoOccupied && state.diceResults.damageDealt > 0) {
			const tokyoPlayer = state.players.find(player => player.inTokyo);
			if (tokyoPlayer.health - state.diceResults.damageDealt > 0) {
				setShowYieldModal = true;
			}
		}

		// PUT PLAYER INTO TOKYO
		let isTokyoOccupied = tokyoOccupied;
		if (!tokyoOccupied && diceResults.damageDealt > 0) {
			isTokyoOccupied = true;
			updatedCurrentPlayer = {
				...currentPlayer, 
				inTokyo: true, 
				points: updatedCurrentPlayer.points +1,
				health: updatedCurrentPlayer.health,
			};
		}
		
		// UPDATE PLAYERS
		const updatedPlayers = players.map((player, i) => {
			if (i === currentPlayerIndex) return updatedCurrentPlayer;
			if (player.inTokyo) {
				return {
					...player, 
					health: player.health - diceResults.damageDealt
				};
			}

			return player;
		})
		
		return {
			...state, 
			players: updatedPlayers, 
			tokyoOccupied: isTokyoOccupied,
			showYieldModal: setShowYieldModal,
		}
	}

	if (action.type === 'CHECK_ELIMINATED') {
		let eliminatedPlayer = state.players.find(player => player.health <= 0);
		if (eliminatedPlayer) {
			const newPlayers = state.players.map((player, i) => {
				if (i === state.currentPlayerIndex) {
					return {...player, inTokyo: true};
				}
				return player;
			}).filter(player => player.health > 0);
		
			const indexOfEliminated = state.players.indexOf(eliminatedPlayer);
			return {
				...state, 
				players: newPlayers, 
				indexOfEliminated: indexOfEliminated,
				showModal: true,
				modalMessage: `${eliminatedPlayer.name} has been eliminated!`,
			}
		}
		return state;
	}

	if (action.type === 'CLOSE_MODAL') {
		return {...state, showModal: false};
	}

	if (action.type === 'SHOW_YIELD_MODAL') {
		return {...state, showYieldModal: true};
	}

	if (action.type === 'HIDE_YIELD_MODAL') {
		return {...state, showYieldModal: false};
	}

	if (action.type === 'HANDLE_YIELD') {
		let prevPlayerIndex = state.currentPlayerIndex -1;
		if (state.currentPlayerIndex === 0) {
			prevPlayerIndex = state.players.length -1;
		}
		return {...state, showYieldModal: false, players: state.players.map((player, i) => {
			if (player.inTokyo) {
				if (player.id -1 === state.currentPlayerIndex) {
					return {...player, inTokyo: false, points: player.points -2}
				}
				return {...player, inTokyo: false};
			}
			if (i === prevPlayerIndex) {
				return {...player, points: player.points +1, inTokyo: true}
			}
			return player;
		})};
	}
}

export default reducer;