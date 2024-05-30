import { useState } from 'react';
import Board from './components/Board';

export default function Game() {
	const [history, setHistory] = useState([Array(9).fill(null)]);
	const [currentMove, setCurrentMove] = useState(0);
	const currentStage = history[currentMove];
	const xIsNext = currentMove % 2 === 0;

	function handlePlay(nextSquares) {
		const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
		setHistory(nextHistory);
		setCurrentMove(nextHistory.length - 1);
	}

	function jumpTo(nextMove) {
		setCurrentMove(nextMove);
	}

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
