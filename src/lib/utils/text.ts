/**
 * Utility functions for text manipulation
 */

/**
 * Truncate content to a specified maximum length and append ellipsis if needed
 */
export function truncateContent(content: string, maxLength: number = 150): string {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
}

/**
 * Format a date string to Indonesian locale format
 */
export function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
