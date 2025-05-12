import MainNavigation from './MainNavigation';
//import { auth } from '@/auth';

export default async function Header() {
  // const session = await auth();

  return (
    <header className="site-header">
      <MainNavigation isLoggedIn={false /* Boolean(session) */} />
    </header>
  );
}
