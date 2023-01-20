const Winner = ({name}) => {
    return <div className={`${name ? "winner-container" : 'hide'}`}>
        <p>{name} is the winner!</p>
        <button className="btn submit-btn" onClick={() => window.location.reload()}>Play again?</button>
    </div>
}

export default Winner;