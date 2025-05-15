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
				Anmelden mit GitHub <FaGithub />
			</button>
		</form>
	);
}
