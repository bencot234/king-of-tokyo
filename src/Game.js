import './App.css';
import Dice from './Dice';
import Player from './Player';
import SelectPlayers from './SelectPlayers';
import { useGlobalContext } from './context';
import board from './images/king-of-tokyo-board.jpeg';
import Modal from './Modal';
import YieldModal from './YieldModal';
import YieldTokyoCityModal from './YieldTokyoCityModal';
import YieldTokyoBayModal from './YieldTokyoBayModal';

function Game() {
	const { 
		rollDice, 
		numRolls, 
		players, 
		setNextPlayer, 
		currentPlayerIndex, 
		resetNumRolls, 
		setDiceResults,
		updatePlayers,
		checkEliminated,
		showModal,
		showYieldModal,
		showYieldTokyoCityModal,
		showYieldTokyoBayModal,
		setPlayerName,
		showGame,
		setTokyoCityYielded,
	} = useGlobalContext();

	const handleSubmit = () => {
		setTokyoCityYielded();
		setDiceResults();
		updatePlayers();
		checkEliminated();
		setNextPlayer();
		resetNumRolls();
		setPlayerName();
	}

	return (
		<main>
			<SelectPlayers/>
			{showGame && <div>
				<Dice/>
				{showYieldModal && <YieldModal/>}
				{showYieldTokyoBayModal && <YieldTokyoBayModal/>}
				{showYieldTokyoCityModal && <YieldTokyoCityModal/>}
				{showModal && <Modal/>}
				<div className='btn-container'>
					<button onClick={rollDice} className='btn general-btn' disabled={numRolls === 0}>Roll Dice</button>
					<button className='btn submit-btn' disabled={numRolls === 3} onClick={handleSubmit}>Submit</button>
				</div>
				<div className="relative board-players-container">
					<div className='players-container'>
						{players.map((player, i) => {
							player.isTurn = i === currentPlayerIndex;
							return <Player key={player.id} {...player}/>
						})}
					</div>
					<div className="board">
						<img className="board-image" src={board} alt="king of tokyo board" />
					</div>
				</div>
			</div>}
		</main>
	);
}

export default Game;