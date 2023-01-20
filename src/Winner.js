const Winner = ({name}) => {
    return <div className={`${name ? "winner-container" : 'hide'}`}>
        <p>{name} is the winner!</p>
    </div>
}

export default Winner;