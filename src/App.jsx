import { useState } from 'react';
import Board from './components/Board';

export default function Game() {
	const [history, setHistory] = useState([Array(9).fill(null)]);
	const [currentMove, setCurrentMove] = useState(0);
	const [isReversed, setReversed] = useState(false);
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

	let moves;
	moves = history.map((squares, move) => {
		let actMove = isReversed ? history.length - move - 1 : move;
		console.log(actMove);

		const description =
			(actMove === currentMove ? `You're at` : `Go to`) +
			(actMove === 0 ? ` game start` : ` move #${actMove}`);

		return (
			<li key={actMove}>
				{actMove === currentMove ? (
					<p>{description}</p>
				) : (
					<button onClick={() => jumpTo(actMove)}>{description}</button>
				)}
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
			<div className='flex flex-col gap-10'>
				<div>
					<ol>{moves}</ol>
				</div>
				<div>
					<button className='bg-cyan-300 px-3 py-1 rounded-md hover:bg-cyan-400 hover:scale-x-105 hover:scale-y-110 duration-700 transition-all' onClick={() => setReversed(!isReversed)}>
						{isReversed ? 'Normal order' : 'Reverse order'}
					</button>
				</div>
			</div>
		</div>
	);
}
