import { useState } from 'react'
import './App.css'
import IconMenu from './IconMenu.jsx'
import IconCheckmark from './IconCheckmark.jsx'
import IconReset from './IconReset.jsx'
import IconX from './IconX.jsx'
import IconMute from './IconMute.jsx'
import IconAlien from './IconAlien.jsx'
import IconCat from './IconCat.jsx'
import IconDog from './IconDog.jsx'
import IconRobot from './IconRobot.jsx'

export default function App() {
	const modes = ['Jeopardy', 'Double Jeopardy', 'Daily Double', 'Final Jeopardy'];
	const sounds = [
		{ id: 'None', icon: <IconMute /> }, 
		{ id: 'Alien', icon: <IconAlien />}, 
		{ id: 'Cat', icon: <IconCat /> }, 
		{ id: 'Dog', icon: <IconDog /> }, 
		{ id: 'Robot', icon: <IconRobot /> },	
	];
	
	const [showMenu, setShowMenu] = useState(false); 
	const [showPoints, setShowPoints] = useState(false); 
	const [showHistory, setShowHistory] = useState(false); 

	const [mode, setMode] = useState('Jeopardy');
	const [points, setPoints] = useState([200, 400, 600, 800, 1000]);
	
	const [sound, setSound] = useState('None');
	const [score, setScore] = useState([]);
	const [thisPoints, setThisPoints] = useState(0);
	const buzzIn = () => {
		if (sound !== 'None') {
			const soundFile = new Audio(sound.toLowerCase() + ".mp3");
			soundFile.play(); 
			soundFile.currentTime = 0;
		}
		setShowPoints(true);
	}
	const handleSetSound = (e) => {
		setSound(e.target.value);
	}
	const handleSetMode = (e) => {
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
	const handleSetPoints = (e) => {
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
					
					<div id="sound">
					<fieldset onChange={handleSetSound}>
						<legend>Buzz-In Sound:</legend>
						{sounds.map((sound, index) => (
						<label key={index}>
							<input type="radio" id={"sound-" + sound.id} name="sound" value={sound.id} defaultChecked={sound.id === 'None'} />
							{sound.icon}
							<span className="hidden">{sound.id}</span>
						</label>
						))}
					</fieldset>
					</div>

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
					<fieldset onChange={handleSetMode}>
						<legend>Mode:</legend>
						{modes.map((mode, index) => (
						<label key={index}>
							<input type="radio" id={"mode-" + mode} name="mode" value={mode} defaultChecked={mode === 'Jeopardy'} />
							<span>{mode}</span>
						</label>
						))}
					</fieldset>
				</div>

				<div id="points">
					{(mode === 'Jeopardy' || mode === 'Double Jeopardy') && (
					<fieldset onChange={handleSetPoints}>
						<legend>Points for this Clue:</legend>
						{points.map((point, index) => (
						<label key={index}>
							<input type="radio" id={"point-" + point} name="points" value={point} defaultChecked={index === 0}/>
							<span>${point}</span>
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
						<button className="button" onClick={handleClick('+')}>
							<IconCheckmark />
							<span>Correct</span>
						</button>
						<button className="button" onClick={handleClick('-')}>
							<IconX />
							<span>Incorrect</span>
						</button>
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