import { useState } from 'react';
import Square from './Square';

export default function Board({ xIsNext, gameStage, onPlay }) {
	// const [xScore, setXScore] = useState(0);
	// const [oScore, setOScore] = useState(0);

	const xPlayerStyle = 'text-purple-300';
	const oPlayerStyle = 'text-pink-300';

	let winner = calculateWinner(gameStage);
	let status = {
		message: '',
		style: '',
		player: '',
	};

	if (winner !== null) {
		status.message = `Winner: `;
		status.style = `text-orange-400 font-bold`;
		status.player = winner;
		// winner === 'X' ? setXScore(xScore + 1) : setOScore(oScore + 1);
		// setSquares(Array(9).fill(null)); //TODO: App enters in an infinite loop if not reset lol
	} else {
		if (gameStage.some((s) => s === null)) {
			const nextPlayer = xIsNext ? 'X' : 'O';
			status.message = `Next player: `;
			status.style = `text-blue-400 font-bold`;
			status.player = nextPlayer;
		} else {
			status.message = `Draw`;
			status.style = `text-yellow-400 font-bold`;
		}
	}

	const board = [];

	for (let i = 0; i < 3; i++) {
		const rows = [];
		let className;
		for (let j = 0; j < 3; j++) {
			className = j === 2 ? 'w-16 h-16' : 'border-r-4 border-black w-16 h-16';
			rows.push(
				<Square
					key={3 * i + j}
					value={gameStage[3 * i + j]}
					onSquareClick={() => handleClick(3 * i + j)}
					className={className}
				/>
			);
		}
		className = i === 2 ? 'board-row' : 'board-row border-b-4 border-black';
		board.push(
			<div
				key={i}
				className={className}
			>
				{rows}
			</div>
		);
	}

	// const boardRows = [...Array(3)].map((x, i) => {
	// 	const boardSquares = [...Array(3)].map((x, j) => {
	// 		return (
	// 			<Square
	// 				key={3 * i + j}
	// 				value={gameStage[3 * i + j]}
	// 				onSquareClick={() => handleClick(3 * i + j)}
	// 			/>
	// 		);
	// 	});

	// 	return (
	// 		<div
	// 			key={i}
	// 			className='board-row'
	// 		>
	// 			{boardSquares}
	// 		</div>
	// 	);
	// });

	function handleClick(i) {
		console.log(i);
		console.log(gameStage[i]);
		if (gameStage[i] || calculateWinner(gameStage)) {
			return;
		}
		// console.log(i);
		const nextSquares = gameStage.slice();
		let player = xIsNext ? 'X' : 'O';
		nextSquares[i] = player;
		// console.log(nextSquares[i]);
		// console.log(i);
		onPlay(nextSquares);
	}

	function calculateWinner(gameStage) {
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
				gameStage[a] &&
				gameStage[a] === gameStage[b] &&
				gameStage[a] === gameStage[c]
			) {
				return gameStage[a];
			}
		}
		return null;
	}

	return (
		<>
			<div className='flex gap-80 w-site justify-center text-3xl'>
				<div className='flex flex-col items-center gap-24 w-[100%]'>
					<div className={status.style}>
						{status.message}
						<span
							className={status.player === 'X' ? xPlayerStyle : oPlayerStyle}
						>
							{status.player}
						</span>
					</div>
					<div>
						{/* <div className='board-row'>
							<Square
								value={gameStage[0]}
								onSquareClick={() => handleClick(0)}
								className='border-b-4 border-r-4 border-black w-16 h-16'
							></Square>
							<Square
								value={gameStage[1]}
								onSquareClick={() => handleClick(1)}
								className='border-b-4 border-r-4 border-black w-16 h-16'
							></Square>
							<Square
								value={gameStage[2]}
								onSquareClick={() => handleClick(2)}
								className='border-b-4 border-black w-16 h-16'
							></Square>
						</div>
						<div className='board-row'>
							<Square
								value={gameStage[3]}
								onSquareClick={() => handleClick(3)}
								className='border-b-4 border-r-4 border-black w-16 h-16'
							></Square>
							<Square
								value={gameStage[4]}
								onSquareClick={() => handleClick(4)}
								className='border-b-4 border-r-4 border-black w-16 h-16'
							></Square>
							<Square
								value={gameStage[5]}
								onSquareClick={() => handleClick(5)}
								className='border-b-4 border-black w-16 h-16'
							></Square>
						</div>
						<div className='board-row'>
							<Square
								value={gameStage[6]}
								onSquareClick={() => handleClick(6)}
								className='border-r-4 border-black w-16 h-16'
							></Square>
							<Square
								value={gameStage[7]}
								onSquareClick={() => handleClick(7)}
								className='border-r-4 border-black w-16 h-16'
							></Square>
							<Square
								value={gameStage[8]}
								onSquareClick={() => handleClick(8)}
								className='w-16 h-16'
							></Square>
						</div> */}
						{board}
						{/* {boardRows} */}
					</div>
				</div>
				{/* <div>
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
				</div> */}
			</div>
		</>
	);
}
