import { useGlobalContext } from "./context";

const YieldTokyoCityModal = () => {
    const { 
        handleYieldTokyoCity,
        tokyoCityPlayer,
        hideYieldTokyoCityModal,
    } = useGlobalContext();

    const handleYield = () => {
        hideYieldTokyoCityModal();
        handleYieldTokyoCity();
    }

    return <div className="winner-container">
        <p>{`${tokyoCityPlayer.name}, do you yield?`}</p>
        <button className="btn submit-btn" onClick={handleYield}>Yes</button>
        <button className="btn submit-btn" onClick={hideYieldTokyoCityModal}>No</button>
    </div>
}

export default YieldTokyoCityModal;