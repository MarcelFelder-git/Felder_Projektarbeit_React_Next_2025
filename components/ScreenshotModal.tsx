'use client';

import { useState } from 'react';

interface Screenshot {
	id: number;
	image: string;
}

interface ScreenshotModalProps {
	screenshots: Screenshot[];
}

export default function ScreenshotModal({ screenshots }: ScreenshotModalProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);

	const openModal = (index: number) => {
		setCurrentIndex(index);
		setIsOpen(true);
	};

	const closeModal = () => setIsOpen(false);

	const next = () => setCurrentIndex((currentIndex + 1) % screenshots.length);
	const prev = () =>
		setCurrentIndex(
			(currentIndex - 1 + screenshots.length) % screenshots.length
		);

	return (
		<>
			<div className="grid">
				{screenshots.map((shot, i) => (
					<img
						key={shot.id}
						src={shot.image}
						alt={`Screenshot ${i + 1}`}
						className="screenshot"
						onClick={() => openModal(i)}
					/>
				))}
			</div>

			{isOpen && (
				<div className="modal-overlay" onClick={closeModal}>
					<button
						className="modal-nav-button prev"
						onClick={(e) => {
							e.stopPropagation();
							prev();
						}}
						aria-label="Previous screenshot"
					>
						‹
					</button>

					<img
						src={screenshots[currentIndex].image}
						alt={`Screenshot ${currentIndex + 1}`}
						className="modal-image"
						onClick={(e) => e.stopPropagation()}
					/>

					<button
						className="modal-nav-button next"
						onClick={(e) => {
							e.stopPropagation();
							next();
						}}
						aria-label="Next screenshot"
					>
						›
					</button>

					<button
						className="modal-close-button"
						onClick={(e) => {
							e.stopPropagation();
							closeModal();
						}}
						aria-label="Close modal"
					>
						×
					</button>
				</div>
			)}
		</>
	);
}
