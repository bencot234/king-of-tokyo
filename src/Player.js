import { FaStar } from 'react-icons/fa';
import { AiFillHeart } from 'react-icons/ai';

const Player = ({id, name, points, health, inTokyo, isTurn, monster}) => {
    return (
        <div className='relative'>
            <div className={`${isTurn ? 'selected-image' : ''} image-container`}>
                <img className={`${monster.name}-image image`} src={monster.image} alt={monster.name} />
            </div>
            <div className={`player-container ${isTurn ? 'player-is-turn' : ''}`}>
                <h2 className={`${inTokyo ? 'player-in-tokyo' : ''} player-name`}>{name}</h2>
                <div className='player-content'>
                    <p className="points"><FaStar className={`${isTurn ? 'star' : ''} icon`}/> <span className='points-number'>{points}</span></p>
                    <p className="health"><AiFillHeart className={`${isTurn ? 'heart' : ''} icon`}/> <span className='health-number'>{health}</span></p>
                </div>
            </div>
        </div>
    );
}

export default Player;