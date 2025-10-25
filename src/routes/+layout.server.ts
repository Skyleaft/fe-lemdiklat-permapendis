import type { ClaimUser } from '$lib/types';

/**
 * Server-side authentication check function
 * Fetches user data from API and returns user if authenticated, null otherwise
 */
async function checkAuth(fetch: typeof globalThis.fetch): Promise<ClaimUser | null> {
    try {
        const response = await fetch('/api/auth/me', {
            method: 'GET',
            // Cookies are automatically included in server-side fetch
        });

        if (response.ok) {
            const user: ClaimUser = await response.json();
            return user;
        } else {
            return null;
        }
    } catch {
        return null;
    }
}

export async function load({ fetch }) {
    // Check authentication and return user data (null if not authenticated)
    const user = await checkAuth(fetch);

    return {
        user
    };
}
