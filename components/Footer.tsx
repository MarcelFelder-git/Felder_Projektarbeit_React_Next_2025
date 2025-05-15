'use client';

import { useSession } from 'next-auth/react';
import { SignIn } from './Auth/SignIn';
import { SignOut } from './Auth/SignOut';
import User from './Auth/User';

export default function Footer() {
	const { data: session } = useSession();

	return (
		<footer className="site-footer">
			<small>&copy; {new Date().getFullYear()}</small>
			<div className="github-login">
				{session && <User {...session.user} />}
				{session ? <SignOut /> : <SignIn />}{' '}
			</div>
		</footer>
	);
}
