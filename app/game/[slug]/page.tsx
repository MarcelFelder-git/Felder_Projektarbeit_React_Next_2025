import { notFound } from 'next/navigation';
import type GameDetails from '@/types/game';
import ScreenshotModal from '@/components/ScreenshotModal';

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;

interface Screenshot {
	id: number;
	image: string;
}

type GameDetailPageProps = {
	params: { slug: string };
};

export async function getGame(slug: string): Promise<GameDetails | null> {
	try {
		const res = await fetch(
			`https://api.rawg.io/api/games/${slug}?key=${API_KEY}`,
			{ next: { revalidate: 3600 } }
		);
		if (!res.ok) return null;
		const game = (await res.json()) as GameDetails;

		const screenshotsRes = await fetch(
			`https://api.rawg.io/api/games/${slug}/screenshots?key=${API_KEY}`,
			{ next: { revalidate: 3600 } }
		);
		const screenshotsData = (await screenshotsRes.json()) as {
			results: Screenshot[];
		};

		game.short_screenshots = screenshotsData.results;

		return game;
	} catch (err) {
		console.error('Fehler beim Laden des Spiels:', err);
		return null;
	}
}

export default async function GameDetailPage(props: GameDetailPageProps) {
	const slug = props.params.slug;
	const game = await getGame(slug);

	const isNonEmpty = (val: unknown): boolean => {
		if (typeof val === 'string') return val.trim() !== '';
		if (typeof val === 'number') return val !== 0;
		if (Array.isArray(val)) return val.length > 0;
		return val !== null && val !== undefined;
	};

	if (!game) return notFound();

	return (
		<main>
			<div className="game-details">
				<h2 className="game-name">{game.name}</h2>
				{isNonEmpty(game.background_image) && (
					<img
						src={game.background_image}
						alt={game.name}
						className="game-image"
					/>
				)}
				{isNonEmpty(game.released) && (
					<p>
						<strong>Released:</strong> {game.released}
					</p>
				)}
				{isNonEmpty(game.rating) && (
					<p>
						<strong>Rating:</strong> {game.rating}
					</p>
				)}
				{isNonEmpty(game.description_raw) && (
					<p className="game-description">
						<strong>Description:</strong>
						{game.description_raw}
					</p>
				)}
				{isNonEmpty(game.playtime) && (
					<p>
						<strong>Playtime:</strong> {game.playtime} hours
					</p>
				)}
				{game.genres?.length > 0 && (
					<p>
						<strong>Genres:</strong>{' '}
						{game.genres.map((genre) => genre.name).join(', ')}
					</p>
				)}
				{isNonEmpty(game.website) && (
					<p className="game-website">
						<strong>Website:</strong>{' '}
						<a href={game.website} target="_blank" rel="noopener noreferrer">
							{game.website}
						</a>
					</p>
				)}
				{game.platforms?.length > 0 && (
					<p className="game-platform">
						<strong>Platforms:</strong>{' '}
						{game.platforms
							.map((platform) => platform.platform.name)
							.join(', ')}
					</p>
				)}
				{game.tags?.length > 0 && (
					<p className="game-tags">
						<strong>Tags:</strong> {game.tags.map((tag) => tag.name).join(', ')}
					</p>
				)}
				{game.short_screenshots?.length > 0 && (
					<section>
						<h3>Screenshots</h3>
						<ScreenshotModal screenshots={game.short_screenshots} />
					</section>
				)}
			</div>
		</main>
	);
}
