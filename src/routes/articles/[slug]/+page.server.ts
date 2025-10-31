import { buildApiUrl } from '$lib/utils/api';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	try {
		const response = await fetch(buildApiUrl(`/api/articles/slug/${params.slug}`), {
			method: 'GET'
		});

		if (response.ok) {
			const article = await response.json();
			
			// Get categories
			const categoriesResponse = await fetch(buildApiUrl('/api/article-categories'));
			const categories = categoriesResponse.ok ? await categoriesResponse.json() : [];
			
			return { article, categories };
		}
	} catch (err) {
		console.error('Failed to load article:', err);
	}

	throw error(404, 'Artikel tidak ditemukan');
};