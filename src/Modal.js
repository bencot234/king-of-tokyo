import { useGlobalContext } from "./context";

const Modal = () => {
    const { modalMessage, closeModal, playAgain, gameOver } = useGlobalContext();

    const resetGame = () => {
        closeModal();
        playAgain();
    }
    return <div className="winner-container">
        <p>{modalMessage}</p>
        {!gameOver && <button className="btn" onClick={closeModal}>Close</button>}
        {gameOver && <button className="btn submit-btn" onClick={resetGame}>Play Again?</button>}
    </div>
}

export default Modal;