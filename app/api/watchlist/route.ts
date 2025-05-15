import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { PrismaClient } from '@/prisma/generated/prisma-client';
import { NextResponse } from 'next/server';

interface WatchlistRequestBody {
	gameSlug: string;
	gameId: number;
}

export async function GET() {
	const session = await getServerSession(authOptions);
	const prisma = new PrismaClient();

	if (!session || !session.user?.email) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	const items = await prisma.watchlist.findMany({
		where: { user: { email: session.user.email } },
	});

	return NextResponse.json(items);
}

export async function POST(req: Request) {
	const session = await getServerSession(authOptions);
	const prisma = new PrismaClient();

	if (!session || !session.user?.email) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	const body = (await req.json()) as WatchlistRequestBody;
	const { gameSlug, gameId } = body;

	try {
		const user = await prisma.user.findUnique({
			where: { email: session.user.email },
		});

		if (!user) {
			return NextResponse.json({ error: 'User not found' }, { status: 404 });
		}

		const item = await prisma.watchlist.create({
			data: {
				gameSlug,
				gameId,
				user: { connect: { id: user.id } },
			},
		});

		return NextResponse.json(item, { status: 201 });
	} catch (error) {
		console.error('Fehler beim Erstellen:', error);
		return NextResponse.json(
			{ error: 'Error adding to watchlist' },
			{ status: 500 }
		);
	}
}
