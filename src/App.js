import './App.css';
import Dice from './Dice';
import Player from './Player';
import SelectPlayers from './SelectPlayers';
import { useGlobalContext } from './context';
import board from './images/king-of-tokyo-board.jpeg';
import Modal from './Modal';
import YieldModal from './YieldModal';



function App() {
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
		setPlayerName,
		showGame,
	} = useGlobalContext();


	const handleSubmit = () => {
		setDiceResults();
		updatePlayers();
		checkEliminated();
		setNextPlayer();
		resetNumRolls();
		setPlayerName();
	}

	return (
		<>
			<SelectPlayers/>
			{showGame && <div>
				<Dice/>
				{showModal && <Modal/>}
				{showYieldModal && <YieldModal/>}
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
		</>
	);
}

export default App;
