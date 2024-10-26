import { useState } from 'react'
import './App.css'
import IconMenu from './IconMenu.jsx'
import IconX from './IconX.jsx'

export default function App() {
	const modes = ['Jeopardy', 'Double Jeopardy', 'Daily Double', 'Final Jeopardy'];
	
	const [showMenu, setShowMenu] = useState(false); 
	const [showPoints, setShowPoints] = useState(false); 
	const [showHistory, setShowHistory] = useState(false); 

	const [mode, setMode] = useState('Jeopardy');
	const [points, setPoints] = useState([200, 400, 600, 800, 1000]);
	
	const sound = new Audio("sound.mp3");
	const [score, setScore] = useState([]);
	const [thisPoints, setThisPoints] = useState(0);
	const buzzIn = () => {
		sound.play(); 
		sound.currentTime = 0;
		setShowPoints(true);
	}
	const onChangeValue2 = (e) => {
		setMode(e.target.value);
		if (e.target.value === 'Jeopardy') {
			setPoints([200, 400, 600, 800, 1000]);
		} else if (e.target.value === 'Double Jeopardy') {
			setPoints([400, 800, 1200, 1600, 2000]);
		} else {
			setPoints([0]);
		}
		const pointsRadio = document.getElementsByName('points');
		pointsRadio.forEach(point => point.checked = false);
	}
	const onChangeValue = (e) => {
		setThisPoints(Number(e.target.value));
	}
	const sum = score.reduce((partialSum, a) => partialSum + a, 0);
	const handleClick = (operator) => () => {
		if (thisPoints === 0) {
			alert('Please select a point value');
			return;
		}
		setScore(score => [...score, operator === '+' ? thisPoints : thisPoints * -1]);
		setShowPoints(false);
	}
	const handleWager = (e) => {
		setThisPoints(Number(e.target.value));
	}

	const toggleMenu = () => {
		setShowMenu(!showMenu);
	}

	const closeModal = () => {
		setShowPoints(false);
	}

	return (
		<>
			<button className="button button-menu" onClick={toggleMenu}>
				<IconMenu />
				<span className="hidden">Menu</span>
			</button>

			{showMenu && (
				<div className="modal modal-menu">
					Menu
				</div>
			)}
			
			<div className="score">{(sum >= 0) ? '$' + sum : '-$' + sum * -1}</div>
			{showPoints && (
			<div className="modal points">
				<button className="button button-modal" onClick={closeModal}>
					<IconX />
					<span className="hidden">Close</span>
				</button>

				<div id="mode">
					<fieldset onChange={onChangeValue2}>
						<legend>Mode:</legend>
						{modes.map((mode, index) => (
						<label key={index}>
							<input type="radio" id={"mode-" + mode} name="mode" value={mode} defaultChecked={mode === 'Jeopardy'} />
							{mode}
						</label>
						))}
					</fieldset>
				</div>

				<div id="points">
					{(mode === 'Jeopardy' || mode === 'Double Jeopardy') && (
					<fieldset onChange={onChangeValue}>
						<legend>Points for this Clue:</legend>
						{points.map((point, index) => (
						<label key={index}>
							<input type="radio" id={"point-" + point} name="points" value={point} />
							${point}
						</label>
						))}
					</fieldset>
					)}
					{(mode === 'Daily Double' || mode === 'Final Jeopardy') && (
					<fieldset>
						<legend>Your Wager:</legend>
						<input type="number" id="wager" min="0" step="100" onChange={handleWager} />
					</fieldset>
					)}
				</div>

				<div id="addsub">
					<fieldset>
						<legend>Your Response:</legend>
						<button onClick={handleClick('+')}>Correct</button>
						<button onClick={handleClick('-')}>Incorrect</button>
					</fieldset>
				</div>

			</div>
			)}

			{showHistory && (
				<div id="history">
					<ul>
						{score.map((score, index) => (
						<li key={index}>{score}</li>
						))}
					</ul>
				</div>
			)}
			
			<button onClick={buzzIn}>Buzz In</button>

		</>
	)
}