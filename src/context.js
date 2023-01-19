import React from 'react';
import players from './players';
import { useContext } from 'react';
const AppContext = React.createContext();

const state = {
    players: players,
}

const AppProvider = ({ children }) => {
    // const setNumPlayers = () => {

    // }
    // const setPlayerName = (id) => {

    // }
    // const rollDice = () => {

    // }
    return (
        <AppContext.Provider
            value={{
                ...state
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