<script lang="ts">
	import { fly } from 'svelte/transition';
	import type { Article } from '$lib/types';
	import { truncateContent, formatDate } from '$lib/utils/text';

	export let article: Article;
	export let index: number;
	export let onEdit: (article: Article) => void;

	function handleImageError(event: Event) {
		const img = event.target as HTMLImageElement;
		img.src = '/fallback-image.jpg';
		img.alt = 'Thumbnail tidak tersedia';
		img.onerror = null;
	}
</script>

<div class="h-full overflow-hidden rounded-2xl transition-shadow hover:shadow-lg">
	<div class="aspect-video bg-surface-container-high p-4">
		{#if article.thumbnail}
			<img
				src="/api/articles/thumbnail/{article.thumbnail}"
				alt={`Thumbnail untuk ${article.title}`}
				class="h-full w-full rounded-lg object-cover"
				loading="lazy"
				onerror={handleImageError}
			/>
		{:else}
			<div
				class="flex h-full w-full items-center justify-center rounded-lg bg-primary-container"
				aria-label="Tidak ada thumbnail tersedia"
			>
				<svg
					class="h-16 w-16 text-primary"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					aria-hidden="true"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="m21 21-4.35-4.35M19 11a8 8 0 1 0-8 8 8 8 0 0 0 8-8z"
					/>
				</svg>
			</div>
		{/if}
	</div>

	<div class="p-6">
		<h3 class="title line-clamp-2 text-xl font-semibold text-on-surface" title={article.title}>
			{article.title}
		</h3>

		<p class="content line-clamp-3 text-sm text-on-surface-variant" title={article.content}>
			{truncateContent(article.content)}
		</p>

		<div class="metadata mb-4 flex items-center gap-2 text-sm text-on-surface-variant">
			<span>Oleh {article.author}</span>
			<span aria-hidden="true">•</span>
			<time datetime={article.updatedAt}>{formatDate(article.updatedAt)}</time>
		</div>

		<button
			class="action-button w-full rounded-lg border border-outline px-4 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary-container"
			onclick={() => onEdit(article)}
			aria-label="Edit artikel {article.title}"
		>
			Edit
		</button>
	</div>
</div>

<style>
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.line-clamp-3 {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.action-button:hover {
		background-color: var(--color-primary-container, rgba(0, 0, 0, 0.1));
		color: var(--color-on-primary-container, inherit);
	}
</style>
