'use client';

import { useEffect, useState } from 'react';
import Filters from '@/components/Filters';
import Link from 'next/link';
import type GameDetails from '@/types/game';
/* import AddToWatchlistButton from '@/components/WatchlistButton'; */
import AddToWatchlistButton from '@/components/WatchlistButton_localstorage';

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;

export default function GamesPage() {
	const [games, setGames] = useState<GameDetails[]>([]);
	const [search, setSearch] = useState('');
	const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
	const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [isNewSearch, setIsNewSearch] = useState(true);

	const hasFilters =
		search ||
		selectedPlatforms.length > 0 ||
		selectedGenres.length > 0 ||
		selectedTags.length > 0;

	useEffect(() => {
		setGames([]);
		setIsNewSearch(true);
		setPage(1);
	}, [search, selectedPlatforms, selectedGenres, selectedTags]);

	/* useEffect(() => {
		setIsNewSearch(true);
		setPage(1);
	}, [search, selectedPlatforms, selectedGenres, selectedTags]); */

	useEffect(() => {
		if (!hasFilters) return;

		const fetchGames = async () => {
			setLoading(true);

			const queryParams: Record<string, string> = {
				key: API_KEY ?? '',
				page_size: '30',
				page: page.toString(),
			};

			if (search) queryParams.search = search;
			if (selectedPlatforms.length)
				queryParams.platforms = selectedPlatforms.join(',');
			if (selectedGenres.length) queryParams.genres = selectedGenres.join(',');
			if (selectedTags.length) queryParams.tags = selectedTags.join(',');

			const url = `https://api.rawg.io/api/games?${new URLSearchParams(
				queryParams
			)}`;

			try {
				const res = await fetch(url);
				const data = (await res.json()) as { results: GameDetails[] };

				const filteredResults = data.results
					.filter((game: GameDetails) =>
						game.name.toLowerCase().includes(search.trim().toLowerCase())
					)
					.sort((a, b) => b.rating - a.rating);

				if (isNewSearch) {
					setGames(filteredResults);
					setIsNewSearch(false);
				} else {
					setGames((prev) => {
						const newGames = filteredResults.filter(
							(game) => !prev.some((existing) => existing.id === game.id)
						);
						return [...prev, ...newGames];
					});
				}
			} catch (error) {
				console.error('Error fetching games:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchGames();
	}, [
		page,
		hasFilters,
		search,
		selectedPlatforms,
		selectedGenres,
		selectedTags,
		isNewSearch,
	]);

	return (
		<main>
			<h2>Find Your Games</h2>
			<p>Choose your favorite platforms, genres and tags</p>
			<input
				type="text"
				placeholder="Search by name"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>

			<Filters
				selectedPlatforms={selectedPlatforms}
				setSelectedPlatforms={setSelectedPlatforms}
				selectedGenres={selectedGenres}
				setSelectedGenres={setSelectedGenres}
				selectedTags={selectedTags}
				setSelectedTags={setSelectedTags}
			/>

			{hasFilters && (
				<>
					<p>Found {games.length} games</p>

					<div className="grid">
						{games.map((game) => (
							<div key={game.id} className="game-card">
								<img src={game.background_image} alt={game.name} />
								<div className="game-card__content">
									<h3>{game.name}</h3>
									<p>Rating: {game.rating} </p>
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

					{!loading && (
						<div className="load-more-button">
							<button onClick={() => setPage((prev) => prev + 1)}>
								Load more Games
							</button>
						</div>
					)}

					{loading && <p>Loading more games...</p>}
				</>
			)}

			{!hasFilters && (
				<p>Please enter a search or use filters to find games.</p>
			)}
		</main>
	);
}
