/**
 * Utility functions for HTML sanitization to prevent XSS attacks
 */

/**
 * Sanitize HTML content to prevent XSS attacks
 * Removes dangerous elements and attributes while preserving safe HTML
 */
export function sanitizeHTML(html: string): string {
	if (!html) return '';
	
	// Create a temporary DOM element to parse the HTML
	const tempDiv = document.createElement('div');
	tempDiv.innerHTML = html;
	
	// Remove potentially dangerous elements
	const dangerousTags = ['script', 'iframe', 'object', 'embed', 'form', 'input', 'button', 'link', 'meta', 'style'];
	dangerousTags.forEach(tag => {
		const elements = tempDiv.querySelectorAll(tag);
		elements.forEach(el => el.remove());
	});
	
	// Remove dangerous attributes
	const dangerousAttributes = [
		'onclick', 'onload', 'onerror', 'onmouseover', 'onfocus', 'onblur', 
		'onsubmit', 'onchange', 'onkeydown', 'onkeyup', 'onmousedown', 
		'onmouseup', 'onresize', 'onunload', 'oncontextmenu'
	];
	
	const allElements = tempDiv.querySelectorAll('*');
	allElements.forEach(el => {
		dangerousAttributes.forEach(attr => {
			if (el.hasAttribute(attr)) {
				el.removeAttribute(attr);
			}
		});
		
		// Remove href attributes that start with javascript:
		if (el.hasAttribute('href')) {
			const href = el.getAttribute('href');
			if (href && href.trim().toLowerCase().startsWith('javascript:')) {
				el.removeAttribute('href');
			}
		}
		
		// Remove src attributes that start with javascript:
		if (el.hasAttribute('src')) {
			const src = el.getAttribute('src');
			if (src && src.trim().toLowerCase().startsWith('javascript:')) {
				el.removeAttribute('src');
			}
		}
	});
	
	return tempDiv.innerHTML;
}

/**
 * Strip all HTML tags from content, returning only plain text
 */
export function stripHTML(html: string): string {
	if (!html) return '';
	const tempDiv = document.createElement('div');
	tempDiv.innerHTML = html;
	return tempDiv.textContent || tempDiv.innerText || '';
}