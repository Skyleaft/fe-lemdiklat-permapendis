<script lang="ts">
	import { Card, Button, TextFieldOutlined, SelectOutlined } from 'm3-svelte';
	import { browser } from '$app/environment';
	import type { ArticleCategory, UpdateArticleRequest } from '$lib/utils/api';
	import type { Article } from '$lib/types';
	import { fade, fly, blur } from 'svelte/transition';

	type Quill = any; // Type will be available at runtime after dynamic import

	export let mode: 'create' | 'edit' = 'create';
	export let open: boolean = false;
	export let categories: ArticleCategory[] = [];
	export let article: Article | null = null;
	export let onSave: (
		article: { title: string; categoryId: number; content: string } | UpdateArticleRequest
	) => void;
	export let onCancel: () => void;

	let quillContainer: HTMLElement;
	let quill: Quill | null = null;
	let title = '';
	let content = '';
	let categoryId: string = '';

	$: options = categories.map((c) => ({
		text: c.name,
		value: c.id.toString()
	}));

	$: if (mode === 'edit' && article && open) {
		title = article.title;
		content = article.content;
		categoryId = article.categoryId.toString();
	}

	$: if (quillContainer && open && !quill && browser) {
		(async () => {
			const { default: Quill } = await import('quill');
			quill = new Quill(quillContainer, {
				theme: 'snow',
				placeholder: 'Ketikkan konten artikel di sini...',
				modules: {
					toolbar: [
						[{ header: [1, 2, 3, false] }],
						['bold', 'italic', 'underline', 'strike'],
						[{ list: 'ordered' }, { list: 'bullet' }],
						['link', 'blockquote'],
						['clean']
					]
				}
			});

			if (mode === 'edit' && article) {
				quill.root.innerHTML = article.content;
			}

			quill.on('text-change', () => {
				content = quill?.root.innerHTML || '';
			});
		})();
	}

	$: if (!open && quill) {
		quill = null;
	}

	function handleSave() {
		if (!title.trim()) {
			alert('Judul artikel tidak boleh kosong');
			return;
		}
		if (!categoryId) {
			alert('Kategori artikel harus dipilih');
			return;
		}
		if (!content.trim()) {
			alert('Konten artikel tidak boleh kosong');
			return;
		}
		const categoryIdNum = parseInt(categoryId);

		if (mode === 'create') {
			onSave({ title, categoryId: categoryIdNum, content });
		} else if (mode === 'edit' && article) {
			onSave({
				title,
				categoryId: categoryIdNum,
				content,
				isPublished: article.isPublished,
				thumbnail: article.thumbnail
			});
		}
		resetForm();
	}

	function handleCancel(event?: MouseEvent) {
		event?.stopPropagation();
		onCancel();
		resetForm();
	}

	function resetForm() {
		title = '';
		content = '';
		categoryId = '';
		if (quill) {
			quill.root.innerHTML = '';
		}
	}

	function handleBackdropClick() {
		handleCancel();
	}
</script>

{#if open}
	<div
		in:blur={{ duration: 300 }}
		out:blur={{ duration: 300 }}
		class="fixed inset-0 z-50 flex items-center justify-center bg-surface/70 backdrop-blur-lg"
		onclick={handleBackdropClick}
	>
		<div
			in:fly={{ y: 20, delay: 200 }}
			out:fly={{ y: -20, duration: 100 }}
			class="max-h-[90vh] w-full max-w-4xl overflow-y-auto p-4"
			onclick={(e) => e.stopPropagation()}
		>
			<Card variant="elevated">
				<div class="p-6">
					<h2 class="mb-6 text-2xl font-bold text-on-surface">
						{mode === 'create' ? 'Buat Artikel Baru' : 'Edit Artikel'}
					</h2>

					<div class="space-y-6">
						<div class="flex w-full flex-col">
							<TextFieldOutlined
								label="Judul Artikel"
								type="text"
								placeholder="Masukkan judul artikel"
								bind:value={title}
							/>
						</div>

						<div class="flex w-full flex-col">
							<SelectOutlined label="Kategori Artikel" bind:value={categoryId} {options} />
						</div>

						<div>
							<label class="mb-2 block text-sm font-medium text-on-surface"> Konten Artikel </label>
							<div class="overflow-hidden rounded-lg border border-outline">
								<div
									bind:this={quillContainer}
									class="h-64 min-h-[16rem] bg-surface"
									style="height: 256px;"
								></div>
							</div>
						</div>
					</div>
					<div class="mt-8 flex justify-end gap-4">
						<Button variant="outlined" onclick={handleCancel}>Batal</Button>
						<Button variant="filled" onclick={handleSave}>Simpan Artikel</Button>
					</div>
				</div>
			</Card>
		</div>
	</div>
{/if}
