import { FaStar } from 'react-icons/fa';
import { AiFillHeart } from 'react-icons/ai';

const Player = ({id, name, points, health, inTokyo, isTurn, monster}) => {
    return (
        <div className='relative'>
            <div className={`${isTurn ? 'selected-image' : ''} image-container`}>
                <img className={`${monster.name}-image image`} src={monster.image} alt={monster.name} />
            </div>
            <div className={`absolute player-container ${isTurn ? 'player-is-turn' : ''}`}>
                <div>
                    <h2 className={`${inTokyo ? 'player-in-tokyo' : ''}`}>{name}</h2>
                    <div className='player-content'>
                        <p><FaStar className={`${isTurn ? 'star' : ''} icon`}/> <span>{points}</span></p>
                        <p><AiFillHeart className={`${isTurn ? 'heart' : ''} icon`}/> <span>{health}</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Player;