import { FaStar } from 'react-icons/fa';
import { AiFillHeart } from 'react-icons/ai';

const Player = ({name, points, health, inTokyo, isTurn, monster, inTokyoCity, inTokyoBay}) => {
	return (
		<div className={`${isTurn ? 'animate__animated animate__pulse' : inTokyo || inTokyoCity || inTokyoBay ? 'player-in-tokyo' : ''} image-container`}>
			<img className={`${monster.name}-image image ${isTurn ? 'selected-image' : ''}`} src={monster.image} alt={monster.name} />
			<div className={`player-container ${isTurn ? 'player-is-turn' : ''}`}>
				<h2>{name}</h2>
				<div className='player-content'>
					<p className="points">
						<FaStar className={`${isTurn ? 'star' : ''} icon`}/> 
						<span className='points-number'>{points}</span>
					</p>
					<p className="health">
						<AiFillHeart className={`${isTurn ? 'heart' : ''} icon`}/> 
						<span className='health-number'>{health}</span>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Player;