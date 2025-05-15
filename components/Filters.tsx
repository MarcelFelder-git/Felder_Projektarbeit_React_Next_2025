'use client';

import { useState, useEffect } from 'react';

export type FilterOption = {
	id: number;
	name: string;
};

interface ApiResponse {
	results: { id: number; name: string }[];
}

type Props = {
	selectedPlatforms: string[];
	setSelectedPlatforms: (v: string[]) => void;
	selectedGenres: string[];
	setSelectedGenres: (v: string[]) => void;
	selectedTags: string[];
	setSelectedTags: (v: string[]) => void;
};

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;

export default function Filters({
	selectedPlatforms,
	setSelectedPlatforms,
	selectedGenres,
	setSelectedGenres,
	selectedTags,
	setSelectedTags,
}: Props) {
	const [platforms, setPlatforms] = useState<FilterOption[]>([]);
	const [genres, setGenres] = useState<FilterOption[]>([]);
	const [tags, setTags] = useState<FilterOption[]>([]);
	const [loading, setLoading] = useState(true);
	const [visibleSection, setVisibleSection] = useState<
		'platforms' | 'genres' | 'tags' | null
	>(null);

	useEffect(() => {
		const fetchData = async () => {
			const platformRes = await fetch(
				`https://api.rawg.io/api/platforms?key=${API_KEY}&page_size=40`
			);
			const genreRes = await fetch(
				`https://api.rawg.io/api/genres?key=${API_KEY}&page_size=40`
			);
			const tagRes = await fetch(
				`https://api.rawg.io/api/tags?key=${API_KEY}&page_size=40`
			);

			const platformData = (await platformRes.json()) as ApiResponse;
			const genreData = (await genreRes.json()) as ApiResponse;
			const tagData = (await tagRes.json()) as ApiResponse;

			setPlatforms(platformData.results);
			setGenres(genreData.results.sort((a, b) => a.name.localeCompare(b.name)));
			setTags(tagData.results.sort((a, b) => a.name.localeCompare(b.name)));

			setLoading(false);
		};

		fetchData();
	}, []);

	const toggleSelection = (
		value: string,
		selected: string[],
		setSelected: (v: string[]) => void
	) => {
		setSelected(
			selected.includes(value)
				? selected.filter((v) => v !== value)
				: [...selected, value]
		);
	};

	if (loading) return <p>Loading filters...</p>;

	const renderFilterSection = () => {
		switch (visibleSection) {
			case 'platforms':
				return (
					<div className="filter-section">
						<h3>Platforms</h3>
						<div className="filter-grid">
							{platforms.map((platform) => (
								<label key={platform.id}>
									<input
										type="checkbox"
										checked={selectedPlatforms.includes(platform.id.toString())}
										onChange={() =>
											toggleSelection(
												platform.id.toString(),
												selectedPlatforms,
												setSelectedPlatforms
											)
										}
									/>
									{platform.name}
								</label>
							))}
						</div>
					</div>
				);
			case 'genres':
				return (
					<div className="filter-section">
						<h3>Genres</h3>
						<div className="filter-grid">
							{genres.map((genre) => (
								<label key={genre.id}>
									<input
										type="checkbox"
										checked={selectedGenres.includes(genre.id.toString())}
										onChange={() =>
											toggleSelection(
												genre.id.toString(),
												selectedGenres,
												setSelectedGenres
											)
										}
									/>
									{genre.name}
								</label>
							))}
						</div>
					</div>
				);
			case 'tags':
				return (
					<div className="filter-section">
						<h3>Tags</h3>
						<div className="filter-grid">
							{tags.map((tag) => (
								<label key={tag.id}>
									<input
										type="checkbox"
										checked={selectedTags.includes(tag.id.toString())}
										onChange={() =>
											toggleSelection(
												tag.id.toString(),
												selectedTags,
												setSelectedTags
											)
										}
									/>
									{tag.name}
								</label>
							))}
						</div>
					</div>
				);
			default:
				return null;
		}
	};

	return (
		<div>
			<div className="filter-button">
				<button onClick={() => setVisibleSection('platforms')}>
					Show Platforms
				</button>
				<button onClick={() => setVisibleSection('genres')}>Show Genres</button>
				<button onClick={() => setVisibleSection('tags')}>Show Tags</button>
			</div>

			{visibleSection && (
				<div className="filter-overlay" onClick={() => setVisibleSection(null)}>
					<div className="filter-modal" onClick={(e) => e.stopPropagation()}>
						<button
							className="filter-close"
							onClick={() => setVisibleSection(null)}
						>
							×
						</button>

						<h3>
							Filter{' '}
							{visibleSection.charAt(0).toUpperCase() + visibleSection.slice(1)}{' '}
						</h3>
						{renderFilterSection()}
					</div>
				</div>
			)}
		</div>
	);
}
