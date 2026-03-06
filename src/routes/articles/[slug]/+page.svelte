<script lang="ts">
	import { formatDate } from '$lib/utils/text';
	import { sanitizeHTML } from '$lib/utils/sanitize';
	import Breadcrumbs from '$lib/components/ui/Breadcrumbs.svelte';
	import Chip from '$lib/components/ui/Chip.svelte';
	import type { PageData } from '../../articles/[slug]/$types';

	interface Category {
		id: string;
		name: string;
	}

	export let data: PageData;
	$: article = data.article;
	$: categories = data.categories || [];
	$: categoryName =
		categories.find((c: Category) => c.id === article.categoryId)?.name || 'Uncategorized';

	$: breadcrumbItems = [
		{ label: 'Beranda', href: '/' },
		{ label: 'Artikel', href: '/articles' },
		{ label: article.title }
	];
</script>

<svelte:head>
	<title>{article.title} - Lemdiklat Permapendis</title>
	<meta name="description" content={article.content.replace(/<[^>]*>/g, '').substring(0, 160)} />
</svelte:head>

<div class="container mx-auto max-w-4xl px-4 py-8">
	<Breadcrumbs items={breadcrumbItems} />
	<article class="prose prose-lg max-w-none">
		<header class="mb-8">
			<h1 class="mb-4 text-3xl font-bold text-on-surface md:text-4xl">{article.title}</h1>
			<div class="mb-4 flex items-center gap-4 text-sm text-on-surface-variant">
				<span>Oleh {article.author}</span>
				<span>•</span>
				<time datetime={article.updatedAt}>{formatDate(article.updatedAt)}</time>
			</div>
			<div class="mb-6">
				<Chip label={categoryName} variant="default" size="md" />
			</div>
			{#if article.thumbnail}
				<img
					src="/api/articles/thumbnail/{article.thumbnail}"
					alt={article.title}
					class="mb-6 h-64 w-full rounded-lg object-cover md:h-96"
				/>
			{/if}
		</header>

		<div class="article-content">
			<div class="ql-editor">
				{@html sanitizeHTML(article.content)}
			</div>
		</div>
	</article>
</div>
