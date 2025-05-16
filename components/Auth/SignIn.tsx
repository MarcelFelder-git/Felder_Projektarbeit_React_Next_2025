import { signIn } from 'next-auth/react';
import { FaGithub } from 'react-icons/fa';

export function SignIn() {
	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault();
				await signIn('github');
			}}
		>
			<button type="submit">
				Sign in with GitHub <FaGithub />
			</button>
		</form>
	);
}
