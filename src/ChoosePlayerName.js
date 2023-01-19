import {useState} from 'react';

const ChoosePlayerName = ({playerID, setPlayerID, players, setPlayers, setShowForms, setShowGame}) => {
	const [name, setName] = useState('');
	const [show, setShow] = useState(true)

	const handleSubmit = (e) => {
        e.preventDefault();
        setPlayers(players.map(player => {
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
			setShowGame(true);
		}
		setName('');

    }
	return (
		<div className={`${show ? '' : 'hide'}`}>
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