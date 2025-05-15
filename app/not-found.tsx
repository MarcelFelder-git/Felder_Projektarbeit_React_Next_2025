import type { Metadata } from 'next';
import Link from 'next/link';

// https://nextjs.org/docs/app/api-reference/file-conventions/not-found

export const metadata: Metadata = {
	title: '404 - Nicht gefunden 🤷',
};

export default function NotFound() {
	return (
		<main className="default-layout">
			<h2>Unfortunately, nothing was found at this URL</h2>

			<p>Try one of the following links:</p>
			<ul>
				<li>
					<Link href="/">Homepage</Link>
				</li>
				<li>
					<Link href="/games_finder">Games Finder</Link>
				</li>
				<li>
					<Link href="/game_of_the_day">Game of the Day</Link>
				</li>
				<li>
					<Link href="/guess_the_game">Guess the Game</Link>
				</li>
				<li>
					<Link href="/watchlist">Watchlist</Link>
				</li>
			</ul>
		</main>
	);
}
