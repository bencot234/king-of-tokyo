import {useState} from 'react';
import { useGlobalContext } from './context';

const ChoosePlayerName = ({playerID, setPlayerID, setShowForms}) => {
	const {setInitialPlayers, players, setShowGame} = useGlobalContext();
	const [name, setName] = useState('');

	const handleSubmit = (e) => {
        e.preventDefault();
        setInitialPlayers(players.map(player => {
            if (player.id === playerID) {
                return {...player, name: name}
            }
            return player;
        }))
        if (playerID < players.length) {
            setPlayerID(playerID + 1);
        } else if (playerID === players.length) {
			setPlayerID(1);
			setShowForms(false);
			setShowGame()
		}
		setName('');
    }
	return (
		<div className='choose-player-name-container'>
			<h1>Choose name for Player {playerID}</h1>
			<form onSubmit={handleSubmit}>
				<input 
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder='Hector'
				/>
				<button type="submit" className="btn submit-btn">Enter</button>
			</form>
		</div>
	)
}

export default ChoosePlayerName;