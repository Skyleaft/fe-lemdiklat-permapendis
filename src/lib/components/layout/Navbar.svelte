<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { Button, Icon, Dialog } from 'm3-svelte';
	import iconLight from '@ktibow/iconset-material-symbols/light-mode-outline';
	import iconDark from '@ktibow/iconset-material-symbols/dark-mode-outline';
	import iconAccount from '@ktibow/iconset-material-symbols/account-circle';
	import iconDashboard from '@ktibow/iconset-material-symbols/dashboard';
	import iconProfile from '@ktibow/iconset-material-symbols/person';
	import iconLogout from '@ktibow/iconset-material-symbols/logout';
	import iconHome from '@ktibow/iconset-material-symbols/home';
	import iconInfo from '@ktibow/iconset-material-symbols/info';
	import iconContact from '@ktibow/iconset-material-symbols/contact-support';
	import LoginDialog from '$lib/components/ui/LoginDialog.svelte';
	import { authStore } from '$lib/stores/auth';
	import { buildApiUrl } from '$lib/utils/api';

	type NavLink = { href: string; icon: any; label: string };
	const navLinks: NavLink[] = [
		{ href: '/', icon: iconHome, label: 'Beranda' },
		{ href: '/about', icon: iconInfo, label: 'Tentang' },
		{ href: '/contact', icon: iconContact, label: 'Kontak' }
	];

	let { toggleTheme }: { toggleTheme: (e: MouseEvent) => void } = $props();

	let searchText = '';
	let showDark = $state(false);

	let isLogining = $state(false);

	let isMenuOpen = $state(false);

	let loggedIn = $state(false);
	let userName = $state('');
	let userId = $state('');

	let showUserMenu = $state(false);

	// Subscribe to auth store for all updates
	let profilePhotoRefreshKey = $state(0);
	authStore.subscribe((state) => {
		loggedIn = state.isAuthenticated;
		userName = state.user?.profileName || state.user?.username || '';
		userId = state.user?.id || '';
		profilePhotoRefreshKey = state.profilePhotoRefreshKey;
	});

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function toggleUserMenu() {
		showUserMenu = !showUserMenu;
	}

	function closeUserMenu() {
		showUserMenu = false;
	}

	function navigateToDashboard() {
		window.location.href = '/dashboard';
		closeUserMenu();
	}

	function navigateToProfile() {
		window.location.href = '/dashboard/profile';
		closeUserMenu();
	}

	async function handleLogout() {
		await authStore.logout();
		goto('/');
		closeUserMenu();
	}
</script>

<header class="sticky top-0 z-50 bg-surface/80 shadow-1 backdrop-blur">
	<div class="mx-auto flex items-center justify-between gap-2 px-4 py-2">
		<a href="/" class="font-bold tracking-tight text-primary">Lemdiklat Permapendis</a>

		<LoginDialog bind:open={isLogining} />

		<div class="hidden items-center gap-1 md:flex">
			{#each navLinks as link}
				<Button
					href={link.href}
					aria-current={$page.url.pathname === link.href ? 'page' : undefined}
					iconType="left"
					variant="text"
				>
					<Icon icon={link.icon} />
					{link.label}
				</Button>
			{/each}
			<span class="mx-2 inline-block h-6 w-px bg-outline-variant align-middle"></span>
			{#if loggedIn}
				<div class="relative flex items-center gap-2">
					<!-- Avatar -->
					{#if userId}
						<img
							class="avatar-img"
							src="{buildApiUrl(`api/users/profile-photo/${userId}`)}?t={profilePhotoRefreshKey}"
							alt="Profile photo"
							onerror={(e) => {
								// Hide image and show fallback on error
								const img = e.currentTarget as HTMLImageElement;
								img.style.display = 'none';
								const nextEl = img.nextElementSibling as HTMLElement;
								if (nextEl) nextEl.style.display = 'flex';
							}}
						/>
						<div class="avatar-fallback" style="display: none;">
							<Icon icon={iconAccount} />
						</div>
					{:else}
						<div class="avatar-fallback">
							<Icon icon={iconAccount} />
						</div>
					{/if}

					<!-- Clickable username -->
					<button
						class="flex cursor-pointer items-center gap-1 text-sm text-on-surface hover:text-on-surface-variant"
						onclick={toggleUserMenu}
					>
						{userName}
						<!-- Dropdown arrow -->
						<svg
							class="h-4 w-4 transition-transform {showUserMenu ? 'rotate-180' : ''}"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M19 9l-7 7-7-7"
							></path>
						</svg>
					</button>

					<!-- User menu dropdown -->
					<div class="user-menu {showUserMenu ? 'open' : ''} bg-surface/90 backdrop-blur">
						<button
							class="flex w-full items-center gap-2 rounded-md px-4 py-2 text-left text-on-surface hover:bg-surface-container"
							onclick={navigateToDashboard}
						>
							<Icon icon={iconDashboard} />
							Dashboard
						</button>
						<button
							class="flex w-full items-center gap-2 rounded-md px-4 py-2 text-left text-on-surface hover:bg-surface-container"
							onclick={navigateToProfile}
						>
							<Icon icon={iconProfile} />
							Profil
						</button>
						<hr class="my-1 border-outline-variant" />
						<button
							class="flex w-full items-center gap-2 rounded-md px-4 py-2 text-left text-on-surface hover:bg-surface-container"
							onclick={handleLogout}
						>
							<Icon icon={iconLogout} />
							Keluar
						</button>
					</div>
				</div>
			{:else}
				<Button variant="outlined" onclick={() => (isLogining = true)}>Masuk</Button>
				<Button href="/register" variant="filled">Daftar</Button>
			{/if}
			<span class="mx-2 inline-block h-6 w-px bg-outline-variant align-middle"></span>
			<!-- Theme switch button (light/dark) for m3-svelte -->
			<Button
				variant="tonal"
				iconType="full"
				onclick={(e: MouseEvent) => {
					showDark = !showDark;
					toggleTheme(e);
				}}
			>
				<Icon icon={showDark ? iconLight : iconDark} />
			</Button>
		</div>

		<div class="md:hidden">
			<Button aria-label="Toggle navigation" onclick={() => toggleMenu()}>
				<!-- Menu icon -->
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="h-6 w-6"
				>
					<path
						d="M3.75 6.75h16.5a.75.75 0 0 0 0-1.5H3.75a.75.75 0 0 0 0 1.5Zm0 6h16.5a.75.75 0 0 0 0-1.5H3.75a.75.75 0 0 0 0 1.5Zm0 6h16.5a.75.75 0 0 0 0-1.5H3.75a.75.75 0 0 0 0 1.5Z"
					/>
				</svg>
			</Button>
		</div>
	</div>

	{#if isMenuOpen}
		<div class="border-outline-variant bg-surface md:hidden">
			<nav class="mx-auto flex max-w-[1080px] flex-col gap-1 px-4 py-2">
				<!-- Navigation Links -->
				{#each navLinks as link}
					<a
						href={link.href}
						aria-current={$page.url.pathname === link.href ? 'page' : undefined}
						class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-on-surface-variant hover:bg-surface-container hover:text-on-surface aria-[current=page]:font-semibold aria-[current=page]:text-on-surface"
						onclick={() => (isMenuOpen = false)}
					>
						<Icon icon={link.icon} />
						{link.label}
					</a>
				{/each}

				{#if loggedIn}
					<!-- User Info -->
					<div class="my-2 flex items-center gap-2 border-t border-outline-variant px-3 py-2">
						<!-- Avatar -->
						{#if userId}
							<img
								class="avatar-img"
								src="{buildApiUrl(`api/users/profile-photo/${userId}`)}?t={profilePhotoRefreshKey}"
								alt="Profile photo"
								onerror={(e) => {
									const img = e.currentTarget as HTMLImageElement;
									img.style.display = 'none';
									const nextEl = img.nextElementSibling as HTMLElement;
									if (nextEl) nextEl.style.display = 'flex';
								}}
							/>
							<div class="avatar-fallback" style="display: none;">
								<Icon icon={iconAccount} />
							</div>
						{:else}
							<div class="avatar-fallback">
								<Icon icon={iconAccount} />
							</div>
						{/if}
						<span class="text-sm font-medium text-on-surface">{userName}</span>
					</div>

					<!-- User Menu Options -->
					<div class="flex flex-col gap-1">
						<button
							class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
							onclick={() => {
								navigateToDashboard();
								isMenuOpen = false;
							}}
						>
							<Icon icon={iconDashboard} />
							Dashboard
						</button>
						<button
							class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
							onclick={() => {
								navigateToProfile();
								isMenuOpen = false;
							}}
						>
							<Icon icon={iconProfile} />
							Profil
						</button>
						<hr class="my-1 border-outline-variant" />
						<button
							class="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
							onclick={() => {
								handleLogout();
								isMenuOpen = false;
							}}
						>
							<Icon icon={iconLogout} />
							Keluar
						</button>
					</div>
				{:else}
					<!-- Auth Buttons -->
					<div class="flex gap-2 px-3 pt-2">
						<Button
							variant="outlined"
							onclick={() => {
								isLogining = true;
								isMenuOpen = false;
							}}>Masuk</Button
						>
						<Button
							href="/register"
							variant="filled"
							onclick={() => {
								isMenuOpen = false;
							}}>Daftar</Button
						>
					</div>
				{/if}

				<!-- Close Button -->
				<div class="pt-1">
					<Button onclick={() => (isMenuOpen = false)}>Tutup</Button>
				</div>
			</nav>
		</div>
	{/if}
</header>

<style>
	/* Responsive enhancement for Navbar */
	.mobile-nav-menu {
		transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		overflow: hidden;
		max-height: 0;
		opacity: 0;
		pointer-events: none;
	}
	.mobile-nav-menu.open {
		max-height: 400px;
		opacity: 1;
		pointer-events: auto;
	}

	.user-menu {
		position: absolute;
		top: 100%;
		right: 0;
		z-index: 50;
		min-width: 200px;
		border: 1px solid rgb(var(--m3-scheme-surface-container-low) / 0.7);
		border-radius: 8px;
		box-shadow:
			0 10px 15px -3px rgba(0, 0, 0, 0.1),
			0 4px 6px -2px rgba(0, 0, 0, 0.05);
		opacity: 0;
		transform: translateY(-10px);
		pointer-events: none;
		transition:
			opacity 0.2s ease,
			transform 0.2s ease;
	}

	.user-menu.open {
		opacity: 1;
		transform: translateY(0);
		pointer-events: auto;
	}

	.avatar-img {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		object-fit: cover;
	}

	.avatar-fallback {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background-color: var(--md-sys-color-surface-variant);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	@media (min-width: 768px) {
		.mobile-nav-toggle,
		.mobile-nav-menu {
			display: none !important;
		}
	}
</style>
