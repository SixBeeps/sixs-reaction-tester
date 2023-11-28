import "./App.css";
import { useState, useEffect } from "react";
import { Clock, ViewGrid, Eye } from "iconoir-react";

function Game() {
	const [curCell, setCurCell] = useState(-1)
	const [errCell, setErrCell] = useState(-1)
	const [gameTime, setGameTime] = useState(10)
	const [gameSize, setGameSize] = useState(5)
	const [doSmooth, setDoSmooth] = useState(false)
	const [score, setScore] = useState(0)
	const [endTime, setEndTime] = useState(-2)
	const [statusText, setStatusText] = useState('Click "Start" to begin!')

	const isGameRunning = () => endTime > Date.now()

	const pickNewCell = () => {
		let newCell = curCell
		while (newCell === curCell) {
			newCell = Math.floor(Math.random() * gameSize * gameSize)
		}
		setCurCell(newCell)
	}

	const gridStying = {
		gridTemplateColumns: "auto ".repeat(gameSize).trim()
	}

	useEffect(() => {
		let tempInterval = setInterval(() => {
			if (isGameRunning()) {
				setStatusText(`${Math.ceil((endTime - Date.now()) / 100) / 10}s`)
			} else if (endTime !== -2 && errCell < 0) {
				setStatusText(`Time's up! Your score: ${score}`)
			}
		}, 100)

		return () => clearInterval(tempInterval)
	}, [endTime, errCell, score])

	return (
		<div className="game">
			<div className="gameSettings">
				<label htmlFor="gameTime"><Clock width={16} className="gameSettingsIcon" /> Time (s):</label>
				<input type="number" id="gameTime" name="gameTime" defaultValue={10} onChange={e => {
					if (isGameRunning()) {
						e.target.value = gameTime
						return
					}
					e.target.value = Math.max(1, Math.min(120, e.target.value))
					setGameTime(e.target.value)
				}}/>
				<label htmlFor="gameSize"><ViewGrid width={16} className="gameSettingsIcon" /> Grid Size:</label>
				<input type="number" id="gameSize" name="gameSize" defaultValue={5} onChange={e => {
					if (isGameRunning()) {
						e.target.value = gameSize
						return
					}
					e.target.value = Math.max(2, Math.min(10, e.target.value))
					setGameSize(e.target.value)
					setCurCell(-1)
					setErrCell(-1)
				}}/>
				<label htmlFor="doSmooth"><Eye width={16} className="gameSettingsIcon" /> Smoothing: </label>
				<input type="checkbox" id="doSmooth" name="doSmooth" defaultChecked={false} onChange={e => {
					setDoSmooth(e.target.checked)
				}}/>
				<button onClick={() => {
					if (isGameRunning()) return
					setScore(0)
					setErrCell(-1)
					pickNewCell()
					setEndTime(Date.now() + gameTime * 1000)
				}}>Start</button>
			</div>
			<div className="gameStatus">
				{statusText}
			</div>
			<div className="gameGrid" style={gridStying}>
				{[...Array(gameSize * gameSize)].map((_, i) => (
					<div
						className={`gameCell${curCell === i ? ' gameCellActive' : ''}${errCell === i ? ' gameCellError' : ''}${doSmooth ? ' transitionable' : ''}`}
						id={`cell-${i}`}
						key={i}
						onMouseDown={() => {
							if (!isGameRunning()) return
							if (curCell === i) {
								setScore(score + 1)
								pickNewCell()
							} else {
								setErrCell(i)
								setEndTime(-1)
								setStatusText("Wrong cell! Your score: " + score)
							}
						}}></div>
				))}
			</div>
		</div>
	)
}

export default Game;