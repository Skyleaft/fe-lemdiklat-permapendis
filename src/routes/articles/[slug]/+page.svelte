<script lang="ts">
	import { formatDate } from '$lib/utils/text';
	import Breadcrumbs from '$lib/components/ui/Breadcrumbs.svelte';
	import Chip from '$lib/components/ui/Chip.svelte';
	import type { PageData } from '../../articles/[slug]/$types';

	export let data: PageData;
	$: article = data.article;
	$: categories = data.categories || [];
	$: categoryName = categories.find(c => c.id === article.categoryId)?.name || 'Uncategorized';

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
			<h1 class="text-3xl md:text-4xl font-bold text-on-surface mb-4">{article.title}</h1>
			<div class="flex items-center gap-4 text-sm text-on-surface-variant mb-4">
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
					class="w-full h-64 md:h-96 object-cover rounded-lg mb-6"
				/>
			{/if}
		</header>
		
		<div class="article-content text-on-surface">
			{@html article.content}
		</div>
	</article>
</div>
