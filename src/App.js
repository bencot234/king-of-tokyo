import './App.css';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Game from './Game';
import Intro from './Intro';

function App() {

	return (
		<div>
			<Router>
				<Routes>
					<Route path="/" element={<Intro/>}/>
					<Route path="/game" element={<Game/>}/>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
