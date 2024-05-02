import { useState } from 'react';

export default function Square({ value, onSquareClick, className }) {
	return (
		<button
			onClick={onSquareClick}
			className={className}
		>
			{value ?? '-'}
		</button>
	);
}
