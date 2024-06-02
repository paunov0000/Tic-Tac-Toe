import Square from './Square';

export default function Board({ xIsNext, gameStage, onPlay }) {
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
		status.player = winner.player;
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
			const squareNum = 3 * i + j;
			className = j === 2 ? 'w-16 h-16' : 'border-r-4 border-black w-16 h-16';
			if (winner && winner.winningSquares.includes(squareNum)) {
				className += ' text-fuchsia-500 font-semibold';
			}
			rows.push(
				<Square
					key={squareNum}
					value={gameStage[squareNum]}
					onSquareClick={() => handleClick(squareNum)}
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

	function handleClick(i) {
		if (gameStage[i] || calculateWinner(gameStage)) {
			return;
		}
		const nextSquares = gameStage.slice();
		let player = xIsNext ? 'X' : 'O';
		nextSquares[i] = player;
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
				return {
					player: gameStage[a],
					winningSquares: lines[index],
				};
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
					<div>{board}</div>
				</div>
			</div>
		</>
	);
}
