import {useState, useEffect} from 'react';
import ChoosePlayerName from './ChoosePlayerName';

const SelectPlayers = ({setPlayers, players, setShowGame}) => {
    const [numPlayers, setNumPlayers] = useState(2);
    const [showForm, setShowForm] = useState(false);
    const [showForms, setShowForms] = useState(true);
    
    const [playerID, setPlayerID] = useState(1);

 

    const handleNumPlayers = (numPlayers) => {
        setNumPlayers(numPlayers);
        setShowForm(true);
        let totalPlayers = [];
        for (let i = 1; i <= numPlayers; i++) {
            totalPlayers.push({
                id: i,
                name: 'player '+i,
                points: 0,
                health: 10,
                inTokyo: false,
                isTurn: true,
		    });
        }
        setPlayers(totalPlayers);
    }

    return <div className={`${showForms ? 'select-players-container' : 'hide'}`}>
        <div className={`${showForm ? 'hide' : 'select-num-players'}`}>
            <h1>Select number of players</h1>
            <button className="btn general-btn" onClick={() => handleNumPlayers(2)}>2</button>
            <button className="btn general-btn" onClick={() => handleNumPlayers(3)}>3</button>
            <button className="btn general-btn" onClick={() => handleNumPlayers(4)}>4</button>
            <button className="btn general-btn" onClick={() => handleNumPlayers(5)}>5</button>
            <button className="btn general-btn" onClick={() => handleNumPlayers(6)}>6</button>
        </div>
        <div className={`${showForm ? '' : 'hide'}`}>
           <ChoosePlayerName playerID={playerID} setPlayerID={setPlayerID} players={players} setPlayers={setPlayers} setShowForms={setShowForms} setShowGame={setShowGame}/>
        </div>
    </div>
}

export default SelectPlayers;