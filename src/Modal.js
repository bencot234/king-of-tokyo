import { useGlobalContext } from "./context";

const Modal = () => {
    const { modalMessage, closeModal, playAgain } = useGlobalContext();

    const resetGame = () => {
        playAgain();
        closeModal();
    }
    return <div className="winner-container">
        <p>{modalMessage}</p>
        <button className="btn" onClick={closeModal}>Close</button>
        {/* <button className="submit-btn" onClick={resetGame}>Play Again?</button> */}
    </div>
}

export default Modal;