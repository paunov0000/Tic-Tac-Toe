import { useState } from 'react';
import Square from './components/Square';

export default function Board() {
	const [squares, setSquares] = useState(Array(9).fill(null));
	const [xIsNext, setXIsNext] = useState(true);
	const [xScore, setXScore] = useState(0);
	const [oScore, setOScore] = useState(0);

	const xPlayerStyle = 'text-purple-300';
	const oPlayerStyle = 'text-pink-300';

	let winner = calculateWinner(squares);
	let status = {
		message: '',
		style: '',
	};

	if (winner !== null) {
		status.message = `Winner: ${winner}`;
		status.style = `text-green-400 font-bold`;
		winner === 'X' ? setXScore(xScore + 1) : setOScore(oScore + 1);
		setSquares(Array(9).fill(null)); //TODO: App enters in an infinite loop if not reset lol
	} else {
		if (squares.some((s) => s === null)) {
			const nextPlayer = xIsNext ? 'X' : 'O';
			status.message = `Next player: ${nextPlayer}`;
			status.style = `text-blue-400 font-bold`;
		} else {
			status.message = `Draw`;
			status.style = `text-yellow-400 font-bold`;
		}
	}

	function handleClick(i) {
		if (squares[i] !== null || calculateWinner(squares) !== null) {
			return;
		}
		const nextSquares = squares.slice();
		let player = xIsNext ? 'X' : 'O';
		nextSquares[i] = player;
		setSquares(nextSquares);
		setXIsNext(!xIsNext);
	}

	function calculateWinner(squares) {
		const lines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];

		for (let index = 0; index < lines.length; index++) {
			const [a, b, c] = lines[index];
			if (
				squares[a] &&
				squares[a] === squares[b] &&
				squares[a] === squares[c]
			) {
				return squares[a];
			}
		}
		return null;
	}

	return (
		<>
			<div className='flex gap-80 w-site justify-center text-3xl'>
				<div className='flex flex-col items-center gap-24'>
					<div className={status.style}>{status.message}</div>
					<div>
						<div className='board-row'>
							<Square
								value={squares[0]}
								onSquareClick={() => handleClick(0)}
								className='border-b-4 border-r-4 border-black w-16 h-16'
							></Square>
							<Square
								value={squares[1]}
								onSquareClick={() => handleClick(1)}
								className='border-b-4 border-r-4 border-black w-16 h-16'
							></Square>
							<Square
								value={squares[2]}
								onSquareClick={() => handleClick(2)}
								className='border-b-4 border-black w-16 h-16'
							></Square>
						</div>
						<div className='board-row'>
							<Square
								value={squares[3]}
								onSquareClick={() => handleClick(3)}
								className='border-b-4 border-r-4 border-black w-16 h-16'
							></Square>
							<Square
								value={squares[4]}
								onSquareClick={() => handleClick(4)}
								className='border-b-4 border-r-4 border-black w-16 h-16'
							></Square>
							<Square
								value={squares[5]}
								onSquareClick={() => handleClick(5)}
								className='border-b-4 border-black w-16 h-16'
							></Square>
						</div>
						<div className='board-row'>
							<Square
								value={squares[6]}
								onSquareClick={() => handleClick(6)}
								className='border-r-4 border-black w-16 h-16'
							></Square>
							<Square
								value={squares[7]}
								onSquareClick={() => handleClick(7)}
								className='border-r-4 border-black w-16 h-16'
							></Square>
							<Square
								value={squares[8]}
								onSquareClick={() => handleClick(8)}
								className='w-16 h-16'
							></Square>
						</div>
					</div>
				</div>
				<div>
					<div>
						<p>Score</p>
					</div>
					<div>
						<div>
							<p>
								X: <span>{xScore}</span>
							</p>
						</div>
						<div>
							<p>
								O: <span>{oScore}</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
