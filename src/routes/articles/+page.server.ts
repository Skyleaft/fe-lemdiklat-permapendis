import { buildApiUrl } from '$lib/utils/api';
import type { PageServerLoad } from './$types';
import type { Article, ArticleCategory } from '$lib/types';

export const load: PageServerLoad = async ({ url, fetch }) => {
	const search = url.searchParams.get('search') || '';
	const page = parseInt(url.searchParams.get('page') || '1');
	const pageSize = 12;

	try {
		// Fetch articles and categories in parallel
		const [articlesResponse, categoriesResponse] = await Promise.all([
			fetch(buildApiUrl('/api/articles/find'), {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					search: search || undefined,
					page,
					pageSize,
					sort: 'updatedAt',
					order: 'desc',
					filter: 'isPublished:true'
				})
			}),
			fetch(buildApiUrl('/api/article-categories'))
		]);

		if (articlesResponse.ok && categoriesResponse.ok) {
			const articlesResult = await articlesResponse.json();
			const categories = await categoriesResponse.json();
			
			// Create category map for quick lookup
			const categoryMap = new Map(categories.map((cat: ArticleCategory) => [cat.id, cat.name]));
			
			// Add categoryName to each article
			const articlesWithCategory = (articlesResult.data || []).map((article: Article) => ({
				...article,
				categoryName: categoryMap.get(article.categoryId) || 'Kategori Tidak Diketahui'
			}));
			
			return {
				articles: articlesWithCategory,
				totalCount: articlesResult.totalCount || 0,
				currentPage: page,
				pageSize,
				search
			};
		}
	} catch (error) {
		console.error('Failed to load articles:', error);
	}

	return {
		articles: [],
		totalCount: 0,
		currentPage: 1,
		pageSize,
		search
	};
};