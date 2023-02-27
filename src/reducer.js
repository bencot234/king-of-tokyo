
const reducer = (state, action) => {

	if (action.type === 'CHECK_ELIMINATED') {
		let eliminatedPlayer = state.players.find(player => player.health <= 0);
		if (eliminatedPlayer) {
			let newPlayers = state.players.map((player, i) => {
				if (i === state.currentPlayerIndex) {
					return {...player, inTokyo: true};
				}
				return player;
			}).filter(player => player.health > 0);
			if (eliminatedPlayer.inTokyoCity) {
				newPlayers = state.players.map((player, i) => {
					if (i === state.currentPlayerIndex) {
						return {...player, inTokyoCity: true};
					}
					return player;
				}).filter(player => player.health > 0);
			}
			if (eliminatedPlayer.inTokyoBay) {
				newPlayers = state.players.map((player, i) => {
					if (i === state.currentPlayerIndex) {
						return {...player, inTokyoBay: true};
					}
					return player;
				}).filter(player => player.health > 0);
			}
			let extraRules = true;
			let bayOccupied = state.tokyoBayOccupied;
			console.log('new players length: ',newPlayers.length);
			if (newPlayers.length < 5) {
				bayOccupied = false;
				extraRules = false;
				newPlayers = newPlayers.map(player => {
					if (player.inTokyoBay) {
						return {...player, inTokyoBay: false};
					}
					return player;
				})
			}
			const indexOfEliminated = state.players.indexOf(eliminatedPlayer);
			return {
				...state, 
				players: newPlayers, 
				indexOfEliminated: indexOfEliminated,
				showModal: true,
				modalMessage: `${eliminatedPlayer.name} has been eliminated!`,
				extraRules: extraRules,
				tokyoBayOccupied: bayOccupied,
			}
		}
		return state;
	}

	if (action.type === 'CLOSE_MODAL') {
		return {...state, showModal: false, gameOver: false};
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

	if (action.type === 'HANDLE_YIELD_TOKYO_CITY') { // --------------------------------------------------------------------
		// GET THE PLAYER INDEX THAT JUST ATTACKED
		let prevPlayerIndex = state.currentPlayerIndex -1;
		if (state.currentPlayerIndex === 0) {
			prevPlayerIndex = state.players.length -1;
		}
		let newPlayers = state.players;
		let tokyoCityOccupied = true;
		let tokyoBayOccupied = false;
		// if no one in tokyo bay
		if (!state.tokyoBayOccupied) {
			newPlayers = state.players.map((player, i) => {
				if (player.inTokyoCity) {
					if (player.id -1 === state.currentPlayerIndex) {
						return {
							...player, 
							inTokyoCity: false,
							points: player.points -2
						}
					}
					return {...player, inTokyoCity: false}
				}
				if (i === prevPlayerIndex) {
					return {...player, points: player.points + 1, inTokyoCity: true};
				}
			})
		}
		// if someone in tokyo bay
		if (state.tokyoBayOccupied) {
			tokyoBayOccupied = true;
			newPlayers = state.players.map((player, i) => {
				if (player.inTokyoCity) {
					if (player.id -1 === state.currentPlayerIndex) {
						return {
							...player, 
							inTokyoCity: false,
							points: player.points -2
						}
					}
					return {...player, inTokyoCity: false}
				}
				if (player.inTokyoBay) {
					return {
						...player,
						inTokyoBay: false,
						inTokyoCity: true,
					}
				}
				if (i === prevPlayerIndex) {
					return {
						...player, 
						points: player.points + 1, 
						inTokyoBay: true
					};
				}
				return player;
			})
		}
		return {
			...state,
			players: newPlayers,
			tokyoCityYielded: true,
			tokyoCityOccupied: tokyoCityOccupied,
			tokyoBayOccupied: tokyoBayOccupied,
		}
	}
	if (action.type === 'HANDLE_YIELD_TOKYO_BAY') {
		// GET THE PLAYER THAT JUST ATTACKED
		let prevPlayerIndex = state.currentPlayerIndex -1;
		if (state.currentPlayerIndex === 0) {
			prevPlayerIndex = state.players.length -1;
		}

		// if someone attacks tokyo
		// and tokyo city yields
		// and tokyo bay yields
		// tokyo bay is unoccupied
		let tokyoBayOccupied = true;
		if (state.tokyoCityYielded) {
			tokyoBayOccupied = false;
		}
		const newPlayers = state.players.map((player, i) => {
			if (player.inTokyoBay) {
				if (player.id -1 === state.currentPlayerIndex) {
					return {
						...player, 
						inTokyoBay: false,
						points: player.points -2
					}
				}
				return {...player, inTokyoBay: false}
			}
			if (i === prevPlayerIndex) {
				return {...player, points: player.points + 1, inTokyoBay: true};
			}
			return player;
		})

		return {...state, players: newPlayers, tokyoBayOccupied: tokyoBayOccupied}
	}

	if (action.type === 'HANDLE_YIELD') {
		// GET THE PLAYER THAT JUST ATTACKED
		let prevPlayerIndex = state.currentPlayerIndex -1;
		if (state.currentPlayerIndex === 0) {
			prevPlayerIndex = state.players.length -1;
		}

		const newPlayers = state.players.map((player, i) => {
			if (player.inTokyo) {
				if (player.id -1 === state.currentPlayerIndex) {
					return {
						...player, 
						inTokyo: false,
						points: player.points -2
					}
				}
				return {...player, inTokyo: false};
			}
			if (i === prevPlayerIndex) {
				return {...player, points: player.points +1, inTokyo: true}
			}
			return player;
		})
		return {...state, showYieldModal: false, players: newPlayers};
	}

	if (action.type === 'HIDE_YIELD_MODAL') {
		return {...state, showYieldModal: false};
	}
	if (action.type === 'HIDE_YIELD_TOKYO_CITY_MODAL') {
		return {...state, showYieldTokyoCityModal: false};
	}
	if (action.type === 'HIDE_YIELD_TOKYO_BAY_MODAL') {
		return {...state, showYieldTokyoBayModal: false};
	}

	if (action.type === 'PLAY_AGAIN') {
		return {
			...state, 
			players: state.playersReloaded, 
			tokyoOccupied: false, 	
			tokyoCityOccupied: false,
			tokyoBayOccupied: false,
		}
	}

	if (action.type === 'REDUCE_ROLLS_LEFT') {
		const rollsLeft = state.numRolls - 1;
		return {
			...state,
			numRolls: rollsLeft,
		}
	}

	if (action.type === 'RESET_NUM_ROLLS') {
		return {...state, numRolls: 3}
	}

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

	if (action.type === 'SELECT_DIE') {
		const selected_die = state.dice.map(die => {
			if (die.id === action.payload) {
				return {...die, selected: !die.selected};
			}
			return die;
		})
		
		return {...state, dice: selected_die}
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

	if (action.type === 'SET_EXTRA_RULES') {
		return {...state, extraRules: action.payload};
	}

	if (action.type === 'SET_INITIAL_PLAYERS') {
		return {...state, players: action.payload, playersReloaded: action.payload}
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

	if (action.type === 'SET_PLAYER_IN_TOKYO_NAME') {
		const playerInTokyo = state.players.find(player => player.inTokyo);
		const playerInTokyoCity = state.players.find(player => player.inTokyoCity);
		const playerInTokyoBay = state.players.find(player => player.inTokyoBay);
		if (playerInTokyo) {
			const name = playerInTokyo.name;
			return {...state, playerInTokyoName: name}
		}
		if (playerInTokyoCity) {
			const name = playerInTokyoCity.name;
			return {...state, tokyoCityPlayer: playerInTokyoCity}
		}
		if (playerInTokyoBay) {
			const name = playerInTokyoBay.name;
			return {...state, tokyoBayPlayer: playerInTokyoBay}
		}
		return state;
	}

	if (action.type === 'SET_TOKYO_CITY_YIELDED') {
		return {...state, tokyoCityYielded: false}
	}

	if (action.type === 'SHOW_GAME') {
		return {...state, showGame: true}
	}

	if (action.type === 'SHOW_MODAL') {
		return {...state, showModal: true, modalMessage: action.payload.message, currentPlayerIndex: action.payload.index, gameOver: action.payload.gameOver}
	}

	if (action.type === 'SHOW_YIELD_MODAL') {
		return {...state, showYieldModal: true};
	}

	if (action.type === 'UPDATE_PLAYERS__EXTRA_RULES') {
		let currentPlayer = action.payload;
		const {
			tokyoCityOccupied,
			tokyoBayOccupied,
			diceResults,
			players,
			tokyoBayPlayer,
		} = state;
		// scenarios:
		// 1. NO ONE IS IN TOKYO
		// if you roll a paw, you go into tokyo city
		if (!tokyoCityOccupied && !tokyoBayOccupied) {
			let newPlayers = players;
			let intoTokyoCity = false;
			if (diceResults.damageDealt > 0) {
				newPlayers = players.map((player) => {
					if (player === currentPlayer) {
						currentPlayer = {
							...player,
							points: player.points + diceResults.points + 1,
							inTokyoCity: true,
						};
						return currentPlayer
					}
					return player;
				})
				intoTokyoCity = true;
			} else {
				newPlayers = players.map((player) => {
					if (player === currentPlayer) {
						currentPlayer = {
							...player,
							points: player.points + diceResults.points,
						};
						return currentPlayer;
					}
					return player;
				})
			}
			return {
				...state,
				players: newPlayers,
				tokyoCityOccupied: intoTokyoCity,
			}
		}
		// 2. CURRENT PLAYER IN TOKYO CITY, NO-ONE IN TOKYO BAY
		if (currentPlayer.inTokyoCity && !tokyoBayOccupied) {
			const updatedPlayers = players.map((player) => {
				if (player === currentPlayer) {
					return {...player, points: player.points + diceResults.points};
				}
				return {
					...player,
					health: player.health - diceResults.damageDealt
				};
			})
			return {
				...state,
				players: updatedPlayers,
			}
		}
		// 3. CURRENT PLAYER IN TOKYO CITY, ONE PLAYER IN TOKYO BAY
		if (currentPlayer.inTokyoCity && tokyoBayOccupied) {
			const updatedPlayers = players.map((player) => {
				if (player === currentPlayer) {
					return {...player, points: player.points + diceResults.points};
				}
				if (player === tokyoBayPlayer) {
					return player;
				}
				return {
					...player,
					health: player.health - diceResults.damageDealt
				};
			})
			return {
				...state,
				players: updatedPlayers,
			}
		}
		// 4. CURRENT PLAYER IN TOKYO BAY
		if (currentPlayer.inTokyoBay) {
			const updatedPlayers = players.map((player, i) => {
				if (player === currentPlayer) {
					return {...player, points: player.points + diceResults.points};
				}
				if (player.inTokyoCity) {
					return player;
				}
				return {
					...player,
					health: player.health - diceResults.damageDealt
				};
			})
			return {
				...state,
				players: updatedPlayers,
			}
		}
		// 5. CURRENT PLAYER NOT IN TOKYO, ONE PLAYER IN TOKYO CITY, NO-ONE IN TOKYO BAY ----------------------------------------------------
		if (!currentPlayer.inTokyoBay && !currentPlayer.inTokyoCity && tokyoCityOccupied && !tokyoBayOccupied) {
			let intoTokyoBay = false;
			const tokyoCityPlayer = players.find(player => player.inTokyoCity);
			
			// UPDATE HEALTH
			let newHealth = currentPlayer.health + diceResults.healthGained;
			if (newHealth > 10) newHealth = 10;

			let updatedCurrentPlayer = {
				...currentPlayer, 
				points: currentPlayer.points + diceResults.points,
				health: newHealth,
			};
			// UPDATE PLAYER
			if (diceResults.damageDealt > 0) {
				updatedCurrentPlayer = {
					...updatedCurrentPlayer, 
					points: updatedCurrentPlayer.points + 1,
					inTokyoBay: true, // WHAT IF TOKYO CITY PLAYER YIELDED?
				};
				intoTokyoBay = true; // WHAT IF TOKYO CITY PLAYER YIELDED?
			}

			// YIELD QUESTION
			let showYieldTokyoCityModal = false;
			if (diceResults.damageDealt > 0) {
				if (tokyoCityPlayer.health - diceResults.damageDealt > 0) {
					showYieldTokyoCityModal = true;	
				}
			}
			
			// UPDATE PLAYERS
			const updatedPlayers = players.map((player) => {
				if (player === currentPlayer) return updatedCurrentPlayer;
				if (player.inTokyoCity) {
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
				tokyoBayOccupied: intoTokyoBay,
				tokyoCityPlayer: tokyoCityPlayer,
				tokyoBayPlayer: updatedCurrentPlayer,
				showYieldTokyoCityModal: showYieldTokyoCityModal,
			}
		}
		// 6. CURRENT PLAYER NOT IN TOKYO, ONE PLAYER IN TOKYO CITY, ONE PLAYER IN TOKYO BAY
		if (!action.payload.inTokyoCity 
			&& !action.payload.inTokyoBay 
			&& tokyoCityOccupied 
			&& tokyoBayOccupied) 
		{
			const currentPlayer = action.payload;
			const {
				players, 
				diceResults,
			} = state;
			let showYieldTokyoCityModal = false;
			let showYieldTokyoBayModal = false;
			
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
			if (diceResults.damageDealt > 0) {
				const tokyoCityPlayer = players.find(player => player.inTokyoCity);
				const tokyoBayPlayer = players.find(player => player.inTokyoBay);
				if (tokyoCityPlayer.health - diceResults.damageDealt > 0) {
					showYieldTokyoCityModal = true;
				}
				console.log('tokyoBayPlayer: ',tokyoBayPlayer)
				console.log('tokyoCityPlayer: ',tokyoCityPlayer)
				console.log('tokyoBayOccupied: ',tokyoBayOccupied)
				console.log('tokyoCityOccupied: ',tokyoCityOccupied)
				if (tokyoBayPlayer.health - diceResults.damageDealt > 0) {
					showYieldTokyoBayModal = true;
				}
			}
			
			// UPDATE PLAYERS
			const updatedPlayers = players.map((player) => {
				if (player === currentPlayer) return updatedCurrentPlayer;
				if (player.inTokyoCity || player.inTokyoBay) {
					return {
						...player,
						health: player.health - diceResults.damageDealt,
					};
				}
				return player;
			})
			
			return {
				...state, 
				players: updatedPlayers,
				showYieldTokyoCityModal: showYieldTokyoCityModal,
				showYieldTokyoBayModal: showYieldTokyoBayModal,
			}
		} 
	}

	if (action.type === 'UPDATE_PLAYERS') {
		// if it's now the turn of the player in tokyo, add 2 points
		let nextPlayerIndex = state.currentPlayerIndex + 1;
		if (state.currentPlayerIndex === state.players.length -1) {
			nextPlayerIndex = 0;
		}
		const newPlayers = state.players.map((player, i) => {
			if ((player.inTokyoCity && nextPlayerIndex === i) || (player.inTokyoBay && nextPlayerIndex === i)) {
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
		// If in Tokyo, 
		// add points to current player 
		// and take damage from everyone else
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
}

export default reducer;