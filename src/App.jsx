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

	function jumpTo(nextMove) {}

	const moves = history.map((squares, move) => {
		let description;
		if (move > 0) {
			description = `Go to move #${move}`;
		} else {
			description = 'Go to game start';
		}

		return (
			<li key={move}>
				<button onClick={() => jumpTo(move)}>{description}</button>
			</li>
		);
	});

	return (
		<div className='flex'>
			<div>
			<Board
				xIsNext={xIsNext}
				gameStage={currentStage}
				onPlay={handlePlay}
			></Board>
			</div>
			<div>
				<ol>{moves}</ol>
			</div>
		</div>
	);
}
