import { signOut } from 'next-auth/react';

export function SignOut() {
	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault();
				await signOut();
			}}
		>
			<button type="submit">Sign Out</button>
		</form>
	);
}
