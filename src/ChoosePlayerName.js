import {useState, useRef, useEffect} from 'react';
import { useGlobalContext } from './context';
import kraken from './images/Kraken.jpeg';
import king from './images/the_king.jpeg';
import gigazaur from './images/Gigazaur.jpeg';
import meka from './images/MekaDragon.jpeg';
import bunny from './images/CyberBunny.jpeg';
import alienoid from './images/Alienoid.jpeg';

const ChoosePlayerName = ({playerID, setPlayerID, setShowForms}) => {
	const nameInput = useRef(null);
	const {setInitialPlayers, players, showGame} = useGlobalContext();
	const [name, setName] = useState('');
	const [monsters, setMonsters] = useState([
		{
			id: 1,
			name: 'kraken',
			image: kraken,
			selected: true,
		},
		{
			id: 2,
			name: 'king',
			image: king,
			selected: false,
		},
		{
			id: 3,
			name: 'gigazaur',
			image: gigazaur,
			selected: false,
		},
		{
			id: 4,
			name: 'meka',
			image: meka,
			selected: false,
		},
		{
			id: 5,
			name: 'bunny',
			image: bunny,
			selected: false,
		},
		{
			id: 6,
			name: 'alienoid',
			image: alienoid,
			selected: false,
		},
	]);

	useEffect(() => {
		if (nameInput.current) {
			nameInput.current.focus();
		}
	}, [])

	const handleSubmit = (e) => {
        e.preventDefault();
        setInitialPlayers(players.map(player => {
			const monster = monsters.find(monster => monster.selected);
			let placeHolderName = name;
			if (!name) {
				placeHolderName = `Player ${playerID}`;
			}
            if (player.id === playerID) {
                return {...player, name: placeHolderName, monster: monster}
            }
            return player;
        }))
        if (playerID < players.length) {
            setPlayerID(playerID + 1);
        } else if (playerID === players.length) {
			setPlayerID(1);
			setShowForms(false);
			showGame()
		}
		setName('');
		const newMonsters = monsters.filter(monster => !monster.selected);

		setMonsters(newMonsters.map((monster, i) => {
			if (i === 0) {
				return {...monster, selected: true}
			}
			return monster;
		}))
    }

	const handleSelectedMonster = (e) => {
		e.preventDefault();
		setMonsters(monsters.map(monster => {
			if (e.target.className.includes(monster.name)) {
				return {...monster, selected: true};
			}
			return {...monster, selected: false}
		}))
	}

	return (
		<div className='choose-player-name-container'>
			<h1>Player {playerID}</h1>
			{monsters.map(monster => {
				const { id, name, image, selected } = monster;
				return <button 
					key={id}
					className={selected ? 'selected-thumb thumb-container' : 'thumb-container'}
					onClick={handleSelectedMonster}
				>
				<img className={`${name}-thumb thumb`} src={image} alt="" />
			</button>
			})}
			<form onSubmit={handleSubmit}>
				<div>
					<input 
						type="text"
						ref={nameInput}
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder={`Player ${playerID}`}
					/>
				</div>
				<button type="submit" className="btn submit-btn">Enter</button>
			</form>
		</div>
	)
}

export default ChoosePlayerName;