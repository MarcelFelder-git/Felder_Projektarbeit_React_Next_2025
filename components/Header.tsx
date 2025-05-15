import MainNavigation from './MainNavigation';
import Link from 'next/link';
//import { auth } from '@/auth';

export default async function Header() {
	// const session = await auth();

	return (
		<header className="site-header">
			<div className="site-header__title">
				<Link href="/">
					<h1>NxtVideoGameHUD</h1>
				</Link>
			</div>
			{/* <button>
				<Link href="/games_finder">Find Your Game</Link>
			</button> */}
			<MainNavigation isLoggedIn={false /* Boolean(session) */} />
		</header>
	);
}
