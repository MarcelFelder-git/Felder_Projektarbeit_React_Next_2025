'use client';

import { useEffect, useState, useCallback } from 'react';
import type GameDetails from '@/types/game';
import LoadingPage from '@/app/loading';

type QuizOption = {
	name: string;
	slug: string;
};

type QuizData = {
	correctGame: GameDetails;
	options: QuizOption[];
};

export default function GuessTheGame() {
	const [quiz, setQuiz] = useState<QuizData | null>(null);
	const [selected, setSelected] = useState<string | null>(null);
	const [feedback, setFeedback] = useState<string>('');
	const [loading, setLoading] = useState(false);

	const generateQuiz = useCallback(async () => {
		setLoading(true);
		setSelected(null);
		setFeedback('');

		try {
			const res = await fetch('/api/guess_game');
			const data = (await res.json()) as { results: GameDetails[] };

			const validGames = data.results.filter(
				(game) =>
					game.name &&
					game.short_screenshots &&
					game.short_screenshots.length > 0 &&
					game.short_screenshots[0].image
			);

			if (validGames.length < 4) throw new Error('Nicht genug valide Spiele.');

			const selectedGames = validGames.slice(0, 4);
			const correctGame = selectedGames[Math.floor(Math.random() * 4)];
			const options = shuffleArray(
				selectedGames.map((game) => ({ name: game.name, slug: game.slug }))
			);

			setQuiz({ correctGame, options });
		} catch (error) {
			console.error('Error loading quiz:', error);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		generateQuiz();
	}, [generateQuiz]);

	const handleAnswer = (slug: string) => {
		setSelected(slug);
		if (!quiz) return;
		if (slug === quiz.correctGame.slug) {
			setFeedback('✅ Correct!');
		} else {
			setFeedback(`❌ Wrong! Correct answer is: ${quiz.correctGame.name}`);
		}
	};

	const shuffleArray = <T,>(array: T[]): T[] => {
		return array.sort(() => Math.random() - 0.5);
	};

	if (loading || !quiz) {
		return <LoadingPage />;
	}

	return (
		<main>
			<div>
				<h2>Guess the Game</h2>

				<img
					src={quiz.correctGame.short_screenshots[0].image}
					alt="Game screenshot"
					className="game-image"
				/>
				<p>Do you recognize this game? Can you guess its name?</p>
				<div className="load-more-button">
					{quiz.options.map((option) => (
						<button
							key={option.slug}
							onClick={() => handleAnswer(option.slug)}
							disabled={!!selected}
						>
							{option.name}
						</button>
					))}
				</div>

				{feedback && <p>{feedback}</p>}

				{selected && (
					<div className="load-more-button">
						<button onClick={generateQuiz}>Next Round</button>
					</div>
				)}
			</div>
		</main>
	);
}
