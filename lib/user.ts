export const getOrCreateUserId = (): string => {
	if (typeof window === 'undefined') return '';

	let userId = localStorage.getItem('anonUserId');

	if (!userId) {
		userId = crypto.randomUUID();
		localStorage.setItem('anonUserId', userId);
	}

	return userId;
};
