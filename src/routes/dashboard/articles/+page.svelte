<script lang="ts">
	import { fly } from 'svelte/transition';
	import { Card, Button, TextField } from 'm3-svelte';
	import ArticleModal from '$lib/components/ui/ArticleModal.svelte';
	import ArticleCard from '$lib/components/ui/ArticleCard.svelte';
	import { createArticle, updateArticle, type ArticleCategory, buildApiUrl } from '$lib/utils/api';
	import type { PageData } from './$types';
	import type { Article, FindRequest } from '$lib/types';

	export let data;

	let articles = data.articles.data;
	let categories = data.categories || [];
	let searchParams = data.searchParams;
	let searchQuery = searchParams.search || '';
	let isLoading = false;
	let totalArticles = data.articles.totalCount;
	let isModalOpen = false;
	let mode: 'create' | 'edit' = 'create';
	let selectedArticle: Article | null = null;
	let isSavingArticle = false;
	$: totalPages = Math.ceil(totalArticles / (searchParams.pageSize || 10));
	// Use requested page instead of response page (which might always be 1 from backend)
	$: currentPage = searchParams.page || 1;

	// Calculate pagination page numbers
	$: paginationPages = (() => {
		const pages = [];
		const startPage = Math.max(1, currentPage - 2);
		for (let i = 0; i < Math.min(5, totalPages - startPage + 1); i++) {
			const pageNum = startPage + i;
			if (pageNum <= totalPages) {
				pages.push(pageNum);
			}
		}
		return pages;
	})();

	function handleCreateArticle() {
		mode = 'create';
		selectedArticle = null;
		isModalOpen = true;
	}

	function handleEditArticle(article: Article) {
		mode = 'edit';
		selectedArticle = article;
		isModalOpen = true;
	}

	async function performSearch(event: Event) {
		event.preventDefault();

		const newParams: FindRequest = {
			search: searchQuery.trim() || undefined,
			page: 1,
			pageSize: searchParams.pageSize || 10,
			sort: searchParams.sort || 'updatedAt',
			order: searchParams.order || 'desc',
			filter: 'isPublished:true'
		};

		isLoading = true;
		try {
			const response = await fetch(buildApiUrl('/api/articles/find'), {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include',
				body: JSON.stringify(newParams)
			});

			if (response.ok) {
				const result = await response.json();
				articles = result.data;
				totalArticles = result.totalCount;
				searchParams = newParams;
				history.replaceState(
					null,
					'',
					`?${new URLSearchParams({
						search: newParams.search || '',
						page: newParams.page?.toString() || '1',
						pageSize: newParams.pageSize?.toString() || '10',
						sort: newParams.sort || 'updatedAt',
						order: newParams.order || 'desc'
					}).toString()}`
				);
			} else {
				console.error('Failed to search articles');
			}
		} catch (error) {
			console.error('Error searching articles:', error);
		} finally {
			isLoading = false;
		}
	}

	async function changePage(page: number) {
		const newParams: FindRequest = {
			search: searchParams.search,
			page: page,
			pageSize: searchParams.pageSize || 10,
			sort: searchParams.sort || 'updatedAt',
			order: searchParams.order || 'desc',
			filter: 'isPublished:true'
		};

		isLoading = true;
		try {
			const response = await fetch(buildApiUrl('/api/articles/find'), {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include',
				body: JSON.stringify(newParams)
			});

			if (response.ok) {
				const result = await response.json();
				articles = result.data;
				totalArticles = result.totalCount;
				searchParams = newParams;
				history.replaceState(
					null,
					'',
					`?${new URLSearchParams({
						search: newParams.search || '',
						page: newParams.page?.toString() || '1',
						pageSize: newParams.pageSize?.toString() || '10',
						sort: newParams.sort || 'updatedAt',
						order: newParams.order || 'desc'
					}).toString()}`
				);
			} else {
				console.error('Failed to load page articles');
			}
		} catch (error) {
			console.error('Error loading page articles:', error);
		} finally {
			isLoading = false;
		}
	}

	async function handleSaveArticle(
		articleData:
			| {
					title: string;
					categoryId: number;
					content: string;
			  }
			| any
	) {
		try {
			isSavingArticle = true;

			if (mode === 'create') {
				await createArticle({
					title: articleData.title,
					categoryId: articleData.categoryId,
					content: articleData.content
				});
			} else if (mode === 'edit' && selectedArticle) {
				await updateArticle(selectedArticle.id, articleData);
			}

			// Refresh articles list after successful save
			window.location.reload();
		} catch (error) {
			console.error('Failed to save article:', error);
			alert('Gagal menyimpan artikel. Silakan coba lagi.');
		} finally {
			isSavingArticle = false;
			isModalOpen = false;
			selectedArticle = null;
			mode = 'create';
		}
	}

	function handleCancelArticle() {
		isModalOpen = false;
		selectedArticle = null;
		mode = 'create';
	}
</script>

<!-- Article Modal -->
<ArticleModal
	{mode}
	open={isModalOpen}
	{categories}
	article={selectedArticle}
	onSave={handleSaveArticle}
	onCancel={handleCancelArticle}
/>

<div class="mx-auto max-w-7xl">
	<!-- Header -->
	<div class="mb-8" in:fly={{ x: -20, duration: 600 }}>
		<div class="mb-4 flex items-center justify-between">
			<div>
				<h1 class="text-3xl font-bold text-on-surface">Artikel</h1>
				<p class="text-on-surface-variant">Daftar artikel dan berita terbaru</p>
			</div>
			<Button variant="filled" onclick={handleCreateArticle}>
				<svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 6v6m0 0v6m0-6h6m-6 0H6"
					/>
				</svg>
				Buat Artikel Baru
			</Button>
		</div>

		<!-- Search Bar -->
		<Card variant="elevated" class="p-4">
			<form onsubmit={performSearch} class="flex gap-4">
				<input
					type="text"
					placeholder="Cari artikel..."
					class="flex-1 rounded-lg border border-outline px-4 py-3 text-sm focus:border-primary focus:outline-none"
					bind:value={searchQuery}
				/>
				<Button variant="filled" type="submit">
					<svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="m21 21-4.35-4.35M19 11a8 8 0 1 0-8 8 8 8 0 0 0 8-8z"
						/>
					</svg>
					Cari
				</Button>
			</form>
		</Card>
	</div>

	<!-- Articles Grid -->
	{#if isLoading}
		<div class="flex h-64 items-center justify-center">
			<div class="text-center">
				<div
					class="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-primary"
				></div>
				<p class="text-on-surface-variant">Memuat artikel...</p>
			</div>
		</div>
	{:else if articles.length === 0}
		<Card variant="elevated" class="p-12 text-center">
			<div class="mb-4">
				<svg
					class="mx-auto h-16 w-16 text-on-surface-variant"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="m21 21-4.35-4.35M19 11a8 8 0 1 0-8 8 8 8 0 0 0 8-8z"
					/>
				</svg>
			</div>
			<h3 class="mb-2 text-xl font-semibold text-on-surface">Tidak ada artikel ditemukan</h3>
			<p class="text-on-surface-variant">
				{#if searchQuery}
					Coba kata kunci pencarian yang berbeda.
				{:else}
					Artikel akan muncul di sini ketika tersedia.
				{/if}
			</p>
		</Card>
	{:else}
		<!-- Article Stats -->
		<div class="mb-6 flex items-center justify-between text-sm text-on-surface-variant">
			<span>Menampilkan {articles.length} dari {totalArticles} artikel</span>
		</div>

		<!-- Articles List -->
		<div
			class="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3"
			in:fly={{ y: 20, duration: 300 }}
		>
			{#each articles as article, index}
				<ArticleCard {article} {index} onEdit={handleEditArticle} />
			{/each}
		</div>

		<!-- Pagination -->
		{#if totalPages > 1}
			<div
				class="mt-12 flex items-center justify-center gap-2"
				in:fly={{ y: 20, duration: 600, delay: 400 }}
			>
				<Button
					variant="outlined"
					disabled={currentPage <= 1}
					onclick={() => changePage(currentPage - 1)}
				>
					Sebelumnya
				</Button>

				<div class="flex gap-1">
					{#each paginationPages as pageNum}
						<button
							class="rounded px-3 py-1 text-sm {pageNum === currentPage
								? 'bg-primary text-on-primary'
								: 'border border-outline text-primary hover:bg-primary-container'}"
							onclick={() => changePage(pageNum)}
						>
							{pageNum}
						</button>
					{/each}
				</div>

				<Button
					variant="outlined"
					disabled={currentPage >= totalPages}
					onclick={() => changePage(currentPage + 1)}
				>
					Selanjutnya
				</Button>
			</div>
		{/if}
	{/if}
</div>
