<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import NewsCard from '$lib/components/ui/NewsCard.svelte';
	import Breadcrumbs from '$lib/components/ui/Breadcrumbs.svelte';
	import { truncateContent, formatDate } from '$lib/utils/text';
	import type { PageData } from './$types';

	export let data: PageData;

	const breadcrumbItems = [
		{ label: 'Beranda', href: '/' },
		{ label: 'Artikel' }
	];

	$: totalPages = Math.ceil(data.totalCount / data.pageSize);
	$: currentPage = data.currentPage;

	let searchQuery = data.search;

	function handleSearch() {
		const params = new URLSearchParams();
		if (searchQuery.trim()) params.set('search', searchQuery.trim());
		params.set('page', '1');
		goto(`/articles?${params.toString()}`);
	}

	function changePage(newPage: number) {
		const params = new URLSearchParams($page.url.searchParams);
		params.set('page', newPage.toString());
		goto(`/articles?${params.toString()}`);
	}
</script>

<svelte:head>
	<title>Semua Artikel - Lemdiklat Permapendis</title>
</svelte:head>

<div class="container mx-auto max-w-7xl px-4 py-8">
	<Breadcrumbs items={breadcrumbItems} />
	<header class="mb-8">
		<h1 class="text-3xl md:text-4xl font-bold text-on-surface mb-4">Semua Artikel</h1>
		<p class="text-on-surface-variant mb-6">Kumpulan artikel dan berita terbaru dari Lemdiklat Permapendis</p>
		
		<form on:submit|preventDefault={handleSearch} class="flex gap-4 max-w-md">
			<input
				type="text"
				placeholder="Cari artikel..."
				bind:value={searchQuery}
				class="flex-1 px-4 py-2 border border-outline rounded-lg focus:outline-none focus:border-primary"
			/>
			<button type="submit" class="px-6 py-2 bg-primary text-on-primary rounded-lg hover:bg-primary/90">
				Cari
			</button>
		</form>
	</header>

	{#if data.articles.length > 0}
		<div class="mb-6">
			<p class="text-sm text-on-surface-variant">
				Menampilkan {data.articles.length} dari {data.totalCount} artikel
				{#if data.search}untuk "{data.search}"{/if}
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
			{#each data.articles as article}
				<NewsCard
					title={article.title}
					excerpt={truncateContent(article.content, 100)}
					imageSrc={article.thumbnail ? `/api/articles/thumbnail/${article.thumbnail}` : '/img/News-rafiki.svg'}
					imageAlt={article.title}
					date={formatDate(article.updatedAt)}
					href="/articles/{article.slug}"
					category={article.categoryName}
				/>
			{/each}
		</div>

		{#if totalPages > 1}
			<div class="flex justify-center gap-2">
				<button
					disabled={currentPage <= 1}
					on:click={() => changePage(currentPage - 1)}
					class="px-3 py-2 border border-outline rounded disabled:opacity-50"
				>
					Sebelumnya
				</button>
				
				{#each Array(Math.min(5, totalPages)) as _, i}
					{@const pageNum = Math.max(1, currentPage - 2) + i}
					{#if pageNum <= totalPages}
						<button
							on:click={() => changePage(pageNum)}
							class="px-3 py-2 rounded {pageNum === currentPage ? 'bg-primary text-on-primary' : 'border border-outline'}"
						>
							{pageNum}
						</button>
					{/if}
				{/each}
				
				<button
					disabled={currentPage >= totalPages}
					on:click={() => changePage(currentPage + 1)}
					class="px-3 py-2 border border-outline rounded disabled:opacity-50"
				>
					Selanjutnya
				</button>
			</div>
		{/if}
	{:else}
		<div class="text-center py-12">
			<p class="text-on-surface-variant text-lg">
				{#if data.search}
					Tidak ada artikel yang ditemukan untuk "{data.search}"
				{:else}
					Belum ada artikel yang tersedia
				{/if}
			</p>
		</div>
	{/if}
</div>