import { useGlobalContext } from "./context";

const YieldModal = () => {
    const { hideYieldModal, handleYield, playerInTokyoName } = useGlobalContext();
    return <div className="winner-container">
        <p>{`${playerInTokyoName}, do you yield?`}</p>
        <button className="btn submit-btn" onClick={handleYield}>Yes</button>
        <button className="btn submit-btn" onClick={hideYieldModal}>No</button>
    </div>
}

export default YieldModal;