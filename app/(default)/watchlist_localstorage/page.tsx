'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type LocalStorageGame = {
	slug: string;
	name: string;
};

const WATCHLIST_KEY = 'watchlist_slugs';

export default function Watchlist() {
	const [games, setGames] = useState<LocalStorageGame[]>([]);

	useEffect(() => {
		if (typeof window === 'undefined') return;

		const stored = localStorage.getItem(WATCHLIST_KEY);
		if (stored) {
			const parsed: LocalStorageGame[] = JSON.parse(
				stored
			) as LocalStorageGame[];
			setGames(parsed);
		}
	}, []);

	const removeFromWatchlist = (slugToRemove: string) => {
		const updated = games.filter((game) => game.slug !== slugToRemove);
		setGames(updated);
		localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updated));
	};

	if (games.length === 0)
		return (
			<main>
				<p>No games in your watchlist yet</p>
			</main>
		);

	return (
		<main>
			<h1>Your Watchlist</h1>
			<ul>
				{games.map((game) => (
					<li key={game.slug} className="watchlist">
						<div className="watchlist-item">
							<span>{game.name}</span>{' '}
							<Link href={`/game/${game.slug}`}>
								<button>Game Details</button>
							</Link>{' '}
							<button onClick={() => removeFromWatchlist(game.slug)}>
								Remove from Watchlist
							</button>
						</div>
					</li>
				))}
			</ul>
		</main>
	);
}
