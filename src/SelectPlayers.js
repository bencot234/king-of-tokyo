import {useState} from 'react';
import ChoosePlayerName from './ChoosePlayerName';
import { useGlobalContext } from './context';

const SelectPlayers = () => {
    const {setInitialPlayers, setExtraRules} = useGlobalContext();
    const [showForm, setShowForm] = useState(false);
    const [showForms, setShowForms] = useState(true);
    
    const [playerID, setPlayerID] = useState(1);

    const handleNumPlayers = (numPlayers) => {
        if (numPlayers >= 5) setExtraRules(true);
        setShowForm(true);
        let totalPlayers = [];
        for (let i = 1; i <= numPlayers; i++) {
            totalPlayers.push({
                id: i,
                name: 'player '+i,
                points: 0,
                health: 3,
                inTokyo: false,
                inTokyoCity: false,
                inTokyoBay: false,
                isTurn: true,
		    });
        }
        setInitialPlayers(totalPlayers);
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
           <ChoosePlayerName playerID={playerID} setPlayerID={setPlayerID} setShowForms={setShowForms}/>
        </div>
    </div>
}

export default SelectPlayers;