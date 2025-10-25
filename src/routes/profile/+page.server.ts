import { redirect } from '@sveltejs/kit';
import type { ClaimUser } from '$lib/types';

/**
 * Profile page server loader - requires authentication and fetches complete user data
 */
async function checkAuth(fetch: typeof globalThis.fetch): Promise<ClaimUser> {
    try {
        const response = await fetch('/api/auth/me', {
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
 * Get complete user data from /api/users/{id}
 */
async function getUserData(fetch: typeof globalThis.fetch, userId: string) {
    try {
        const response = await fetch(`/api/users/${userId}`, {
            method: 'GET',
            // Cookies are automatically included in server-side fetch
        });

        if (response.ok) {
            const userData = await response.json();
            return userData;
        } else {
            // If unable to get complete user data, fall back to auth data
            console.warn('Failed to fetch complete user data, using auth data');
            return null;
        }
    } catch (error) {
        console.warn('Error fetching complete user data, using auth data', error);
        return null;
    }
}

export async function load({ fetch }) {
    // Check authentication and get basic user data
    const authUser = await checkAuth(fetch);

    // Try to get complete user data from /api/users/{id}
    const userData = await getUserData(fetch, authUser.id);

    // Return complete user data if available, otherwise fallback to auth data
    const user = userData || authUser;

    return {
        user
    };
}
