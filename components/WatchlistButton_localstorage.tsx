'use client';

import { useState, useEffect } from 'react';
type Props = {
	gameSlug: string;
	gameName: string;
};

const WATCHLIST_KEY = 'watchlist_slugs';

export default function AddToWatchlistButton({ gameSlug, gameName }: Props) {
	const [inWatchlist, setInWatchlist] = useState(false);

	useEffect(() => {
		if (typeof window === 'undefined') return;

		const stored = localStorage.getItem(WATCHLIST_KEY);
		if (stored) {
			const watchlist = JSON.parse(stored) as { slug: string; name: string }[];
			setInWatchlist(watchlist.some((game) => game.slug === gameSlug));
		}
	}, [gameSlug]);

	const toggleWatchlist = () => {
		if (typeof window === 'undefined') return;

		const stored = localStorage.getItem(WATCHLIST_KEY);
		let watchlist: { slug: string; name: string }[] = stored
			? (JSON.parse(stored) as { slug: string; name: string }[])
			: [];

		if (watchlist.some((game) => game.slug === gameSlug)) {
			watchlist = watchlist.filter((game) => game.slug !== gameSlug);
			setInWatchlist(false);
		} else {
			watchlist.push({ slug: gameSlug, name: gameName });
			setInWatchlist(true);
		}

		localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
	};

	return (
		<button onClick={toggleWatchlist}>
			{inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
		</button>
	);
}
