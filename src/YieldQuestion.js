const YieldQuestion = ({name, showYieldQuestion, setShowYieldQuestion, handleYield}) => {
    return <div className={`${showYieldQuestion ? "yield-question-container" : 'hide'}`}>
        <p>{name} do you yield?</p>
        <button className="btn submit-btn" onClick={handleYield}>Yes</button>
        <button className="btn submit-btn" onClick={() => setShowYieldQuestion(false)}>No</button>
    </div>
}

export default YieldQuestion;