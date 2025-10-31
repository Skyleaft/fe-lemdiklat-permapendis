<script lang="ts">
	interface BreadcrumbItem {
		label: string;
		href?: string;
	}

	export let items: BreadcrumbItem[] = [];
</script>

<nav aria-label="Breadcrumb" class="mb-4">
	<ol class="flex items-center gap-2 text-sm text-on-surface-variant">
		{#each items as item, index}
			<li class="flex items-center gap-2">
				{#if item.href}
					<a href={item.href} class="hover:text-on-surface transition-colors">
						{item.label}
					</a>
				{:else}
					<span class="text-on-surface font-medium">{item.label}</span>
				{/if}
				{#if index < items.length - 1}
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
					</svg>
				{/if}
			</li>
		{/each}
	</ol>
</nav>