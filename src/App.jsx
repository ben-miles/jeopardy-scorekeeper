import { useState } from 'react'
import './App.css'

export default function App() {
  const [count, setCount] = useState(0)
//   const [count, setCount] = useState(0)

	const sound = new Audio("sound.mp3");
	const buzzIn = () => {
		sound.play(); 
		sound.currentTime = 0;
		// TODO: SHOW the points array and correct/incorrect buttons
	}
	return (
		<>
			<button onClick={buzzIn}>Buzz In</button>
		</>
	)
}