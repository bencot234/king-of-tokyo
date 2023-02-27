import { useGlobalContext } from "./context";

const YieldTokyoBayModal = () => {
    const { 
        handleYieldTokyoBay,
        tokyoBayPlayer,
        hideYieldTokyoBayModal,
    } = useGlobalContext();

     const handleYield = () => {
        hideYieldTokyoBayModal();
        handleYieldTokyoBay();
    }

    return <div className="winner-container">
        <p>{`${tokyoBayPlayer.name}, do you yield?`}</p>
        <button className="btn submit-btn" onClick={handleYield}>Yes</button>
        <button className="btn submit-btn" onClick={hideYieldTokyoBayModal}>No</button>
    </div>
}

export default YieldTokyoBayModal;