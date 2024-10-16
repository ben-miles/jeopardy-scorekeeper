import { useState } from 'react'
import './App.css'

export default function App() {
	const points = [200, 400, 600, 800, 1000]
	const sound = new Audio("sound.mp3");
	const [score, setScore] = useState([]);
	const [thisPoints, setThisPoints] = useState(0);
	const buzzIn = () => {
		sound.play(); 
		sound.currentTime = 0;
		// TODO: SHOW the points array and correct/incorrect buttons
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
		// TODO: HIDE the points array and correct/incorrect buttons
	}
	return (
		<>
			<button onClick={buzzIn}>Buzz In</button>
			<div id="points">
				<fieldset onChange={onChangeValue}>
					<legend>Points for this Clue:</legend>
					{points.map((point, index) => (
					<div key={index}>
						<label>
							<input 
								type="radio" 
								id={"point-" + point} 
								name="points" 
								value={point}
								// defaultChecked={index === 0}
							/>
							${point}
						</label>
					</div>
					))}
				</fieldset>
			</div>
			<div id="addsub">
				<fieldset>
					<legend>Your Response:</legend>
					<button onClick={handleClick('+')}>Correct</button>
					<button onClick={handleClick('-')}>Incorrect</button>
				</fieldset>
			</div>
			<div id="history">
				<ul>
					{score.map((score, index) => (
					<li key={index}>{score}</li>
					))}
				</ul>
			</div>
			<div id="score">{sum}</div>
		</>
	)
}