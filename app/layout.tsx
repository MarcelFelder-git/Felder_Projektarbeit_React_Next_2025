import '@/css/style.css';
import type { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import { Karla, Merriweather } from 'next/font/google';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';

export const metadata: Metadata = {
	title: 'NxtVideoGameHUD',
	description: 'App to find your next game',
	icons: [
		{ url: '/favicon.ico', type: 'image/x-icon' },
		{ url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
		{ url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
	],
};

export const viewport: Viewport = {
	themeColor: [
		{ color: 'hotpink', media: '(prefers-color-scheme: light)' },
		{ color: 'purple', media: '(prefers-color-scheme: dark)' },
	],
};

const karlaStyles = Karla({
	subsets: ['latin'],
	weight: ['500', '800'],
	style: 'normal',
	display: 'swap',
	variable: '--font-karla',
});

const merriweatherStyles = Merriweather({
	subsets: ['latin'],
	weight: ['300', '400', '700', '900'],
	style: ['italic', 'normal'],
	display: 'swap',
	variable: '--font-merriweather',
});

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html
			lang="de"
			className={`${karlaStyles.variable} ${merriweatherStyles.variable}`}
		>
			<body>
				<AuthProvider>
					{' '}
					<div className="site-wrapper">
						<Header />
						<div className="site-content">{children}</div>
						<Footer />
					</div>
				</AuthProvider>
			</body>
		</html>
	);
}
