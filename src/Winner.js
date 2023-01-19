const Winner = ({name, showWinner}) => {
    return <div className={`${showWinner ? "winner-container" : 'hide'}`}>
        <p>{name} is the winner!</p>
    </div>
}

export default Winner;