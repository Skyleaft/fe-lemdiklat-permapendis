import { PUBLIC_API_BASE_URL } from '$env/static/public';
import { dev } from '$app/environment';

export const API_BASE_URL = PUBLIC_API_BASE_URL || 'http://localhost:3000';

// Use relative URLs for same-origin requests (works with proxy)
export function buildApiUrl(path: string): string {
    // For development with Vite proxy, use relative URLs
    // For production, use absolute URLs from environment
    if (dev) {
        // Use relative paths that get proxied by Vite
        return path.startsWith('/') ? path : `/${path}`;
    }

    // Use absolute URLs for production
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    return `${API_BASE_URL}/${cleanPath}`;
}
