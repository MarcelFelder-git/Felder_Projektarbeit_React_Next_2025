'use client';

import { useState } from 'react';

interface AddToWatchlistButtonProps {
	gameId: number;
	gameSlug: string;
}

export default function AddToWatchlistButton({
	gameId,
	gameSlug,
}: AddToWatchlistButtonProps) {
	const [isAdded, setIsAdded] = useState(false);

	const handleAddToWatchlist = async () => {
		try {
			const response = await fetch('/api/watchlist', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ gameId, gameSlug }),
			});

			if (response.ok) {
				setIsAdded(true);
			} else {
				console.error('Fehler beim Hinzufügen zur Watchlist');
			}
		} catch (error) {
			console.error('Fehler beim Kommunizieren mit der API:', error);
		}
	};

	return (
		<button onClick={handleAddToWatchlist} disabled={isAdded}>
			{isAdded ? 'Added to Watchlist' : 'Add to Watchlist'}
		</button>
	);
}
