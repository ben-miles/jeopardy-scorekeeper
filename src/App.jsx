import { useState } from 'react'
import './App.css'

export default function App() {
  const [count, setCount] = useState(0)
//   const [count, setCount] = useState(0)
const sound = new Audio("sound.mp3");
const playSound = () => { 
	sound.play(); 
	sound.currentTime = 0;
}

  return (
  )
}