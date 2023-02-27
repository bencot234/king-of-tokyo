import React from 'react';
import reducer from './reducer';
import { useContext, useReducer, useEffect } from 'react';
const AppContext = React.createContext();

const initialState = {
	dice: [
		{id: 1, value: 1, selected: false},
		{id: 2, value: 1, selected: false},
		{id: 3, value: 1, selected: false},
		{id: 4, value: 1, selected: false},
		{id: 5, value: 1, selected: false},
		// {id: 6, value: 1, selected: false},
	],
	numRolls: 3,
	players: [],
	playersReloaded: [],
	currentPlayerIndex: 0,
	diceResults: {
		points: 0,
		damageDealt: 0,
		healthGained: 0,
	},
	showModal: false,
	showYieldModal: false,
	showYieldTokyoCityModal: false,
	showYieldTokyoBayModal: false,
	modalMessage: '',
	tokyoOccupied: false,
	tokyoCityOccupied: false,
	tokyoBayOccupied: false,
	indexOfEliminated: null,
	showGame: false,
	playerInTokyoName: '',
	extraRules: false,
	gameOver: false,
	tokyoCityPlayer: {},
	tokyoBayPlayer: {},
};

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
 
	const checkEliminated = () => {
		dispatch({type: 'CHECK_ELIMINATED'})
	}

	const closeModal = () => {
		dispatch({type: 'CLOSE_MODAL'});
	}

	const currentPlayer = () => {
		return state.players.find((player, i) => i === state.currentPlayerIndex);
	}

	const deselectDice = () => {
		dispatch({type: 'DESELECT_DICE'})
	}
	
	const handleYield = () => {
		dispatch({type: 'HANDLE_YIELD'});
	}

	const hideYieldModal = () => {
		dispatch({type: 'HIDE_YIELD_MODAL'});
	}

	const playAgain = () => {
		dispatch({type: 'PLAY_AGAIN'});
	}

	const resetNumRolls = () => {
		dispatch({type: 'RESET_NUM_ROLLS'});
	}

	const rollDice = () => {
		dispatch({type: 'ROLL_DICE'});
		dispatch({type: 'REDUCE_ROLLS_LEFT'});
	}
	
	const selectDie = (id) => {
		dispatch({type: 'SELECT_DIE', payload: id});
	}

	const setDiceResults = () => {
		dispatch({type: 'SET_DICE_RESULTS'});
	}

	const setExtraRules = () => {
		dispatch({type: 'SET_EXTRA_RULES'})
	}

	const setInitialPlayers = (initialPlayers) => {
		dispatch({type: 'SET_INITIAL_PLAYERS', payload: initialPlayers})
	}

	const setNextPlayer = () => {
		dispatch({type: 'SET_NEXT_PLAYER'});
	}

    const setPlayerName = () => {
		dispatch({type: 'SET_PLAYER_IN_TOKYO_NAME'})
    }

	const setShowGame = () => {
		dispatch({type: 'SET_SHOW_GAME'});
	}
   
	const updatePlayers = () => {
		const currentPlayer = state.players.find((player, i) => i === state.currentPlayerIndex);
		if (state.extraRules) {
			dispatch({type: 'UPDATE_PLAYERS__EXTRA_RULES', payload: currentPlayer})
		} else {
			if (currentPlayer.inTokyo) {
				dispatch({type: 'UPDATE_PLAYERS__CURRENT_PLAYER_IN_TOKYO'})
			} else {
				dispatch({type: 'UPDATE_PLAYERS__CURRENT_PLAYER_OUT_TOKYO'})
			}
			dispatch({type: 'UPDATE_PLAYERS'});
		}
	}

	// WIN CONDITIONS
	useEffect(() => {
		if (state.players.length === 1) {
			const name = state.players.find(player => player).name;
			dispatch({type: 'SHOW_MODAL', payload: {message: `${name} is the winner!`, index: 0, gameOver: true}});
		}
		state.players.map((player, i) => {
			if (player.points >= 20) {
				dispatch({type: 'SHOW_MODAL', payload: {message: `${player.name} is the winner!`, index: i, gameOver: true}});
			}
		});
	}, [state.players]);

    return (
        <AppContext.Provider
            value={{
                ...state,
                rollDice,
				deselectDice,
				selectDie,
				setNextPlayer,
				resetNumRolls,
				setDiceResults,
				updatePlayers,
				checkEliminated,
				currentPlayer,
				closeModal,
				hideYieldModal,
				handleYield,
				setPlayerName,
				setInitialPlayers,
				setShowGame,
				playAgain,
				setExtraRules,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export {AppContext, AppProvider}