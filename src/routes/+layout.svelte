<script lang="ts">
	import '../app.css';

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
		
		// Ripple animation
		const x = e.clientX;
		const y = e.clientY;
		const rippleEl = document.createElement('div');
		rippleEl.className = 'theme-ripple';
		document.body.appendChild(rippleEl);
		rippleEl.style.left = `${x}px`;
		rippleEl.style.top = `${y}px`;
		rippleEl.style.backgroundColor = isDark ? 'rgb(11 15 12)' : 'rgb(248 250 243)';
		
		requestAnimationFrame(() => rippleEl.classList.add('expand'));
		
		setTimeout(() => applyThemeAttr(isDark), 200);
		setTimeout(() => rippleEl.classList.add('fade'), 300);
		setTimeout(() => rippleEl.remove(), 1000);
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

</script>



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
