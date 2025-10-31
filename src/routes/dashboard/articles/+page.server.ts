import { redirect } from '@sveltejs/kit';
import type { ClaimUser, PaginatedResponseArticle, FindRequest } from '$lib/types';
import { buildApiUrl, type ArticleCategory } from '$lib/utils/api';

/**
 * Articles page server loader - requires authentication and fetches published articles
 */
async function checkAuth(fetch: typeof globalThis.fetch): Promise<ClaimUser> {
    try {
        const response = await fetch(buildApiUrl('/api/auth/me'), {
            method: 'GET',
            // Cookies are automatically included in server-side fetch
        });

        if (response.ok) {
            const user: ClaimUser = await response.json();
            return user;
        } else {
            throw redirect(302, '/');
        }
    } catch (error) {
        if (error instanceof Response) {
            throw error; // Re-throw redirect
        }
        throw redirect(302, '/');
    }
}

/**
 * Get article categories from /api/article-categories
 */
async function getArticleCategories(fetch: typeof globalThis.fetch): Promise<ArticleCategory[]> {
    try {
        const response = await fetch(buildApiUrl('/api/article-categories'), {
            method: 'GET',
            // Cookies are automatically included in server-side fetch
        });

        if (response.ok) {
            const categories: ArticleCategory[] = await response.json();
            return categories;
        } else {
            console.warn('Failed to fetch article categories');
            return [];
        }
    } catch (error) {
        console.warn('Error fetching article categories', error);
        return [];
    }
}

/**
 * Get articles from /api/articles/find
 */
async function getArticles(fetch: typeof globalThis.fetch, searchParams?: FindRequest): Promise<PaginatedResponseArticle> {
    try {
        const response = await fetch(buildApiUrl('/api/articles/find'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(searchParams || {}),
            // Cookies are automatically included in server-side fetch
        });

        if (response.ok) {
            const articles: PaginatedResponseArticle = await response.json();
            return articles;
        } else {
            // Return empty list if unable to fetch articles
            console.warn('Failed to fetch articles');
            return {
                data: [],
                totalCount: 0,
                page: 1,
                pageSize: 10
            };
        }
    } catch (error) {
        console.warn('Error fetching articles', error);
        return {
            data: [],
            totalCount: 0,
            page: 1,
            pageSize: 10
        };
    }
}

export async function load({ fetch, url }) {
    // Check authentication
    await checkAuth(fetch);

    // Parse search parameters
    const searchParams: FindRequest = {
        search: url.searchParams.get('search') || undefined,
        page: parseInt(url.searchParams.get('page') || '1'),
        pageSize: parseInt(url.searchParams.get('pageSize') || '10'),
        sort: url.searchParams.get('sort') || 'updatedAt',
        order: url.searchParams.get('order') || 'desc',
        filter: ''
    };

    // Get articles
    const articles = await getArticles(fetch, searchParams);

    // Get article categories
    const categories = await getArticleCategories(fetch);

    return {
        articles,
        searchParams,
        categories
    };
}
