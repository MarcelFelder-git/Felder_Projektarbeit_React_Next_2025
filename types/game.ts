export default interface GameDetails {
	id: number;
	slug: string;
	name: string;
	background_image: string;
	description_raw: string;
	rating: number;
	released: string;
	playtime: number;
	website: string;
	genres: { name: string }[];
	platforms: { platform: { name: string } }[];
	twitch_count: number;
	tags: { name: string }[];
	short_screenshots: { id: number; image: string }[];
}
