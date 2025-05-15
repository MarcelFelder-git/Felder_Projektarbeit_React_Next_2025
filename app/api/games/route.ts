import { NextResponse } from 'next/server';

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;

export async function GET() {
	if (!API_KEY) {
		return NextResponse.json({ error: 'API_KEY fehlt' }, { status: 500 });
	}

	try {
		const res = await fetch(
			`https://api.rawg.io/api/games?key=${API_KEY}&page_size=50`
		);
		if (!res.ok) {
			const errorData = await res.json();
			return NextResponse.json(
				{ error: 'RAWG API Fehler', details: errorData },
				{ status: res.status }
			);
		}
		const data = await res.json();
		return NextResponse.json(data);
	} catch (err) {
		return NextResponse.json(
			{ error: 'Fetch Fehler', details: (err as Error).message },
			{ status: 500 }
		);
	}
}
