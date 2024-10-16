import { useState } from 'react'
import './App.css'

export default function App() {
	const points = [200, 400, 600, 800, 1000]
	const sound = new Audio("sound.mp3");
	const [thisPoints, setThisPoints] = useState(0);
	const buzzIn = () => {
		sound.play(); 
		sound.currentTime = 0;
		// TODO: SHOW the points array and correct/incorrect buttons
	}
	const onChangeValue = (e) => {
		setThisPoints(Number(e.target.value));
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
		</>
	)
}