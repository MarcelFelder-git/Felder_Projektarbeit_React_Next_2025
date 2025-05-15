import Link from 'next/link';
import type GameDetails from '@/types/game';

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;

const getSeededRandomIndex = (max: number) => {
	const today = new Date().toISOString().slice(0, 10);
	let hash = 0;
	for (let i = 0; i < today.length; i++) {
		hash = today.charCodeAt(i) + ((hash << 5) - hash);
	}
	return Math.abs(hash) % max;
};

export default async function RandomOfTheDay() {
	const randomPage = getSeededRandomIndex(500000) + 1;

	const res = await fetch(
		`https://api.rawg.io/api/games?key=${API_KEY}&page=${randomPage}&page_size=1`,
		{ next: { revalidate: 86400 } }
	);

	const data = (await res.json()) as { results: GameDetails[] };
	const game = data.results[0];

	if (!game) {
		return <p>No Game found</p>;
	}

	return (
		<main>
			<section className="random-of-the-day">
				<h1>Game of the Day</h1>
				<h2 className="game-name">{game.name}</h2>
				<img
					src={game.background_image}
					alt={game.name}
					className="game-image"
				/>

				<div className="load-more-button">
					<Link href={`/game/${game.slug}`}>
						<button>Game Details</button>
					</Link>
				</div>
			</section>
		</main>
	);
}
