import { useState } from 'react';
import Board from './components/Board';

export default function Game() {
	const [xIsNext, setXIsNext] = useState(true);
	const [history, setHistory] = useState([Array(9).fill(null)]);
	const currentStage = history[history.length - 1];

	function handlePlay(nextSquares) {
		setHistory([...history, nextSquares]);
		setXIsNext(!xIsNext);
	}

	return (
		<>
			<Board
				xIsNext={xIsNext}
				gameStage={currentStage}
				onPlay={handlePlay}
			></Board>
		</>
	);
}
