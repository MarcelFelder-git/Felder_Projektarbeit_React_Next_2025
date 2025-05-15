'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import LoadingPage from './loading';
import RandomGameButton from '@/components/RandomGameButton';
// import AddToWatchlistButton from '@/components/WatchlistButton_prisma';
import AddToWatchlistButton from '@/components/WatchlistButton_localstorage';
import type GameDetails from '@/types/game';

export default function GameGrid() {
	const [games, setGames] = useState<GameDetails[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchGames = async () => {
			try {
				const res = await fetch('/api/games');
				const data = (await res.json()) as { results: GameDetails[] };
				setGames(data.results);
			} catch (err) {
				console.error('Loading error:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchGames();
	}, []);

	if (loading) return <LoadingPage />;

	return (
		<main>
			<div className="home-buttons">
				<button>
					<Link href="/games_finder">Find Your Game</Link>
				</button>
				<RandomGameButton />
			</div>

			<h2>Featured Games</h2>
			<div className="grid">
				{games.map((game) => (
					<div key={game.id} className="game-card">
						<img src={game.background_image} alt={game.name} />
						<div className="game-card__content">
							<h3>{game.name}</h3>
							<div className="game-card__actions">
								<Link href={`/game/${game.slug}`}>
									<button>Game Details</button>
								</Link>
								<AddToWatchlistButton
									gameName={game.name}
									gameSlug={game.slug}
								/>
							</div>
						</div>
					</div>
				))}
			</div>
		</main>
	);
}
