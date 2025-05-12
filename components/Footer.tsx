/* import { auth } from '@/auth';
import SignIn from './Auth/SignIn';
import User from './Auth/User';
import { SignOut } from './Auth/SignOut';
 */
export default async function Footer() {
  // const session = await auth();

  return (
    <footer className="site-footer">
      <small>&copy; {new Date().getFullYear()}</small>
      {/*   {session ? <SignOut /> : <SignIn />}
      {session && <User {...session.user} />} */}
    </footer>
  );
}
