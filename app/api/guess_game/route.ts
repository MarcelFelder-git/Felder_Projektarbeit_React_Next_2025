// app/api/guess-game/route.ts
import { NextResponse } from 'next/server';
import type GameDetails from '@/types/game';

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;

export async function GET() {
	const randomPage = Math.floor(Math.random() * 1000) + 1;
	const res = await fetch(
		`https://api.rawg.io/api/games?key=${API_KEY}&page=${randomPage}&page_size=10`
	);
	const data = (await res.json()) as { results: GameDetails[] };

	if (!data.results || !Array.isArray(data.results)) {
		throw new Error('Ungültiges Datenformat von /api/guess-game');
	}
	return NextResponse.json(data);
}
