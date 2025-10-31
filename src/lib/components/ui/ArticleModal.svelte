<script lang="ts">
	import { Card, Button, TextFieldOutlined, SelectOutlined, Checkbox } from 'm3-svelte';
	import { browser } from '$app/environment';
	import type { ArticleCategory, UpdateArticleRequest, CreateArticleRequest } from '$lib/utils/api';
	import { createArticleWithThumbnail, uploadThumbnail } from '$lib/utils/api';
	import type { Article } from '$lib/types';
	import { fade, fly, blur } from 'svelte/transition';

	type Quill = any; // Type will be available at runtime after dynamic import

	export let mode: 'create' | 'edit' = 'create';
	export let open: boolean = false;
	export let categories: ArticleCategory[] = [];
	export let article: Article | null = null;
	export let onSave: (
		article: CreateArticleRequest | UpdateArticleRequest,
		thumbnailFile?: File
	) => void;
	export let onCancel: () => void;
	export let onDelete: ((article: Article) => void) | null = null;

	let quillContainer: HTMLElement;
	let quill: Quill | null = null;
	let title = '';
	let content = '';
	let categoryId: string = '';
	let thumbnailFile: File | null = null;
	let thumbnailPreview: string | null = null;
	let isPublished = false;

	$: options = categories.map((c) => ({
		text: c.name,
		value: c.id.toString()
	}));

	$: if (mode === 'edit' && article && open) {
		title = article.title;
		content = article.content;
		categoryId = article.categoryId.toString();
		thumbnailFile = null;
		thumbnailPreview = null;
		isPublished = article.isPublished;
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
			onSave({ title, categoryId: categoryIdNum, content }, thumbnailFile || undefined);
		} else if (mode === 'edit' && article) {
			onSave(
				{
					title,
					categoryId: categoryIdNum,
					content,
					isPublished,
					thumbnail: article.thumbnail
				},
				thumbnailFile || undefined
			);
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
		thumbnailFile = null;
		thumbnailPreview = null;
		isPublished = false;
		if (quill) {
			quill.root.innerHTML = '';
		}
	}

	function handleThumbnailChange(event: Event) {
		const input = event.target as HTMLInputElement;
		const file = input.files?.[0];
		if (file) {
			thumbnailFile = file;
			const reader = new FileReader();
			reader.onload = (e) => {
				thumbnailPreview = e.target?.result as string;
			};
			reader.readAsDataURL(file);
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
							<TextFieldOutlined label="Judul Artikel" type="text" bind:value={title} />
						</div>

						<div class="flex w-full flex-col">
							<SelectOutlined label="Kategori Artikel" bind:value={categoryId} {options} />
						</div>

						{#if mode === 'edit'}
							<div class="flex items-center gap-3">
								<label>
									<Checkbox
										><input type="checkbox" bind:checked={isPublished} /></Checkbox>
									Publikasikan artikel
								</label>
							</div>
						{/if}

						<div class="flex w-full flex-col">
							<TextFieldOutlined
								label="Thumbnail Artikel"
								type="File"
								accept="image/*"
								onchange={handleThumbnailChange}
							/>
							{#if thumbnailPreview}
								<div class="mt-2">
									<img
										src={thumbnailPreview}
										alt="Preview"
										class="h-32 w-32 rounded-lg object-cover"
									/>
								</div>
							{/if}
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
					<div class="mt-8 flex justify-between">
						<div>
							{#if mode === 'edit' && article && onDelete}
								<Button variant="tonal" color="text-error" onclick={() => onDelete?.(article)}
									>Hapus Artikel</Button
								>
							{/if}
						</div>
						<div class="flex gap-4">
							<Button variant="outlined" onclick={handleCancel}>Batal</Button>
							<Button variant="filled" onclick={handleSave}>Simpan Artikel</Button>
						</div>
					</div>
				</div>
			</Card>
		</div>
	</div>
{/if}
