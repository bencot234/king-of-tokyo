import players from './players';
const AppContext = React.createContext();

const state = {
    players: players,
}

const AppProvider = ({ children }) => {
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