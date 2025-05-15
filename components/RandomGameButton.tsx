'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type GameDetails from '@/types/game';

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;

export default function RandomGameButton() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const getRandomGame = async () => {
		setIsLoading(true);
		const randomPage = Math.floor(Math.random() * 500000) + 1;

		try {
			const res = await fetch(
				`https://api.rawg.io/api/games?key=${API_KEY}&page=${randomPage}&page_size=1`
			);

			const data = (await res.json()) as { results: GameDetails[] };
			const game = data.results[0];

			if (game) {
				router.push(`/game/${game.slug}`);
			} else {
				alert('No game found.');
				setIsLoading(false);
			}
		} catch (error) {
			console.error('Fetch failed:', error);
			alert('Something went wrong.');
			setIsLoading(false);
		}
	};

	return (
		<button onClick={getRandomGame} disabled={isLoading}>
			{isLoading ? 'Shuffling...' : 'Show Random Game'}
		</button>
	);
}
