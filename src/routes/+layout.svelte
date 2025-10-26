<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import DashboardSidebar from '$lib/components/layout/DashboardSidebar.svelte';
	import { DynamicScheme, Hct, Variant } from '@ktibow/material-color-utilities-nightly';
	import variants from './variants';
	import { page } from '$app/stores';
	import { fade, fly, slide, draw, crossfade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { animate, spring } from 'motion';
	import { authStore } from '$lib/stores/auth';

	let { children } = $props();

	let isDark = $state(false);

	function applyThemeAttr(dark: boolean) {
		if (typeof document !== 'undefined') {
			document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
			if (dark) {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
		}
	}

	export function toggleTheme(e: MouseEvent) {
		isDark = !isDark;
		localStorage.setItem('m3-theme', isDark ? 'dark' : 'light');
		// Posisi klik relatif ke viewport
		const x = e.clientX;
		const y = e.clientY;

		const rippleEl = document.createElement('div');
		rippleEl.className = 'theme-ripple';
		document.body.appendChild(rippleEl);

		// Posisi ripple
		rippleEl.style.left = `${x}px`;
		rippleEl.style.top = `${y}px`;

		const rippleColor = !isDark ? 'rgb(243 243 250)' : 'rgb(17 19 24)';

		rippleEl.style.backgroundColor = rippleColor;

		// Mulai animasi scale
		requestAnimationFrame(() => rippleEl.classList.add('expand'));

		// Ganti tema setelah ripple cukup besar
		setTimeout(() => {
			applyThemeAttr(isDark);
		}, 300);

		// Setelah tema berganti, fade out ripple
		setTimeout(() => {
			rippleEl.classList.add('fade');
		}, 400);

		// Hapus ripple setelah animasi selesai
		setTimeout(() => {
			rippleEl.remove();
		}, 1300);

		//applyThemeAttr(isDark);
	}

	onMount(async () => {
		const saved = localStorage.getItem('m3-theme');
		if (saved === 'dark' || saved === 'light') {
			isDark = saved === 'dark';
		} else {
			isDark =
				typeof window !== 'undefined' &&
				window.matchMedia &&
				window.matchMedia('(prefers-color-scheme: dark)').matches;
		}
		applyThemeAttr(isDark);

		// Check if user is already authenticated
		await authStore.checkAuth();
	});

	let sourceColor = $state(13679871);
	let variant: Variant = $state(Variant.TONAL_SPOT);
	let specVersion: '2021' | '2025' = $state('2025');
	let contrast = $state(0);
	let density = $state(0);

	let schemes = $derived.by(() => {
		const commonArgs = {
			sourceColorHct: Hct.fromInt(sourceColor),
			contrastLevel: contrast,
			specVersion
		} as const;
		const result = {} as Record<Variant, { light: DynamicScheme; dark: DynamicScheme }>;
		for (const { id } of variants) {
			result[id] = {
				light: new DynamicScheme({ ...commonArgs, variant: id, isDark: false }),
				dark: new DynamicScheme({ ...commonArgs, variant: id, isDark: true })
			};
		}
		return result;
	});
	let { light, dark } = $derived(schemes[variant]);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if !$page.url.pathname.startsWith('/dashboard')}
	<Navbar {toggleTheme} />
{/if}
{#if $page.url.pathname.startsWith('/dashboard') && $authStore.isAuthenticated}
	<DashboardSidebar />
{/if}
{#key $page.url.pathname}
	<div in:fly={{ duration: 500, x: 20 }} out:fly={{ duration: 150, x: -20 }}>
		{@render children?.()}
	</div>
{/key}
{#if !$page.url.pathname.startsWith('/dashboard')}
	<Footer />
{/if}

<style>
	/* Universal box-sizing */
	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}

	html,
	body {
		min-height: 100%;
	}

	body {
		margin: 0;
		padding: 0;
		width: 100vw;
		min-height: 100vh;
		overflow-x: hidden;
		font-family: inherit;
	}

	.layout-wrapper {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		width: 100vw;
		overflow-x: hidden;
		background: var(--m3-surface, #fff);
	}

	main.layout-content {
		flex: 1 1 auto;
		width: 100vw;
		padding: 0;
	}

	@media (max-width: 640px) {
		.layout-wrapper {
			padding: 0 !important;
			width: 100vw;
		}
		main.layout-content {
			padding: 0 !important;
			width: 100vw !important;
			margin: 0;
		}
	}
</style>
