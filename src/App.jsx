import { useState } from 'react';
import Square from './components/Square';

export default function Board() {
	const [squares, setSquares] = useState(Array(9).fill(null));
	const [xIsNext, setXIsNext] = useState(true);

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
			<div className='board-row'>
				<Square
					value={squares[0]}
					onSquareClick={() => handleClick(0)}
				></Square>
				<Square
					value={squares[1]}
					onSquareClick={() => handleClick(1)}
				></Square>
				<Square
					value={squares[2]}
					onSquareClick={() => handleClick(2)}
				></Square>
			</div>
			<div className='board-row'>
				<Square
					value={squares[3]}
					onSquareClick={() => handleClick(3)}
				></Square>
				<Square
					value={squares[4]}
					onSquareClick={() => handleClick(4)}
				></Square>
				<Square
					value={squares[5]}
					onSquareClick={() => handleClick(5)}
				></Square>
			</div>
			<div className='board-row'>
				<Square
					value={squares[6]}
					onSquareClick={() => handleClick(6)}
				></Square>
				<Square
					value={squares[7]}
					onSquareClick={() => handleClick(7)}
				></Square>
				<Square
					value={squares[8]}
					onSquareClick={() => handleClick(8)}
				></Square>
			</div>
		</>
	);
}
