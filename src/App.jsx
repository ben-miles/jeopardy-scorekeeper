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
	const modeOptions = ['Jeopardy', 'Double Jeopardy', 'Daily Double', 'Final Jeopardy'];
	const [mode, setMode] = useState('Jeopardy');

	const pointsOptions = [
		[200, 400, 600, 800, 1000],
		[400, 800, 1200, 1600, 2000]
	];
	const [possiblePoints, setPossiblePoints] = useState(pointsOptions[0]);
	const [score, setScore] = useState([]);
	const [clueValue, setClueValue] = useState(200);

	const soundOptions = [
		{ id: 'None', icon: <IconMute /> }, 
		{ id: 'Alien', icon: <IconAlien />}, 
		{ id: 'Cat', icon: <IconCat /> }, 
		{ id: 'Dog', icon: <IconDog /> }, 
		{ id: 'Robot', icon: <IconRobot /> },	
	];
	const [sound, setSound] = useState('None');
	
	const [showMenu, setShowMenu] = useState(false); 
	const [showPoints, setShowPoints] = useState(false);

	const buzzIn = () => {
		if (sound !== 'None') {
			const soundFile = new Audio(sound.toLowerCase() + ".mp3");
			soundFile.play(); 
			soundFile.currentTime = 0;
		}
		setShowPoints(true);
	}
	const resetScore = () => {
		setScore([]);
	}
	const changeSound = (e) => {
		setSound(e.target.value);
	}
	const changeMode = (e) => {
		setMode(e.target.value);
		if (e.target.value === 'Jeopardy') {
			setPossiblePoints(pointsOptions[0]);
			setClueValue(pointsOptions[0][0]);
		} else if (e.target.value === 'Double Jeopardy') {
			setPossiblePoints(pointsOptions[1]);
			setClueValue(pointsOptions[1][0]);
		} else {
			setPossiblePoints(0);
			setClueValue(0);
		}
		const pointsRadio = document.getElementsByName('points');
		pointsRadio.forEach(point => point.checked = false);
	}
	const changeClueValue = (e) => {
		setClueValue(Number(e.target.value));
	}
	const sum = score.reduce((partialSum, a) => partialSum + a, 0);
	const handleClick = (operator) => () => {
		if (thisPoints === 0) {
			alert('Please select a point value');
			return;
		}
		setScore(score => [...score, operator === '+' ? clueValue : clueValue * -1]);
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
						<fieldset>
							<legend>Buzz-In Sound:</legend>
							{soundOptions.map((soundOption, index) => (
							<label key={index}>
								<input type="radio" 
									id={"sound-" + soundOption.id} 
									name="sound" 
									value={soundOption.id} 
									checked={soundOption.id === sound} 
									onChange={changeSound} />
								{soundOption.icon}
								<span className="hidden">{soundOption.id}</span>
							</label>
							))}
						</fieldset>
					</div>

					<div id="score-history">
						<fieldset>
							<legend>Score History:</legend>

							<div id="history">
								<ul>
									{score.map((score, index) => (
									<li key={index}>{score}</li>
									))}
								</ul>
							</div>

							<button className="button" onClick={resetScore}>
								<IconReset />
								<span>Reset</span>
							</button>							

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
					<fieldset>
						<legend>Mode:</legend>
						{modeOptions.map((modeOption, index) => (
						<label key={index}>
							<input type="radio" 
								id={"mode-" + modeOption} 
								name="mode" 
								value={modeOption} 
								checked={modeOption === mode} 
								onChange={changeMode}/>
							<span>{modeOption}</span>
						</label>
						))}
					</fieldset>
				</div>

				<div id="points">
					{(mode === 'Jeopardy' || mode === 'Double Jeopardy') && (
					<fieldset>
						<legend>Value for this Clue:</legend>
						{possiblePoints.map((possiblePoint, index) => (
						<label key={index}>
							<input type="radio" 
								id={"point-" + possiblePoint} 
								name="points" 
								value={possiblePoint} 
								checked={possiblePoint === clueValue}
								onChange={changeClueValue} />
							<span>${possiblePoint}</span>
						</label>
						))}
					</fieldset>
					)}
					{(mode === 'Daily Double' || mode === 'Final Jeopardy') && (
					<fieldset>
						<legend>Your Wager:</legend>
						<input type="number" 
							id="wager" 
							min="0" 
							step="100" 
							value={clueValue} 
							onChange={changeClueValue} />
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
			
			<button onClick={buzzIn}>Buzz In</button>

		</>
	)
}