<script lang="ts">
	export let label: string;
	export let variant: 'default' | 'success' | 'warning' | 'error' = 'default';
	export let size: 'sm' | 'md' = 'sm';

	$: classes = {
		default: 'bg-primary-container text-on-primary-container',
		success: 'bg-green-100 text-green-800',
		warning: 'bg-yellow-100 text-yellow-800',
		error: 'bg-red-100 text-red-800'
	}[variant];

	$: sizeClasses = {
		sm: 'px-2 py-1 text-xs',
		md: 'px-3 py-1.5 text-sm'
	}[size];
</script>

<span class="inline-flex items-center font-medium rounded-full {classes} {sizeClasses}">
	{label}
</span>