'use client';

import React, { useEffect, useState } from 'react';
import type GameDetails from '@/types/game';

const Watchlist = () => {
	const [watchlist, setWatchlist] = useState<GameDetails[]>([]);

	useEffect(() => {
		const fetchWatchlist = async () => {
			const response = await fetch('/api/watchlist');
			const data = (await response.json()) as GameDetails[];
			setWatchlist(data);
		};

		fetchWatchlist();
	}, []);

	return (
		<main>
			<div>
				<h2>Watchlist</h2>
				<ul>
					{watchlist.map((item) => (
						<li key={item.id}>
							<a href={`/game/${item.slug}`}>{item.slug}</a>{' '}
						</li>
					))}
				</ul>
				<p>This feature is coming soon! Stay tuned!</p>
			</div>
		</main>
	);
};

export default Watchlist;
