<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { slide } from 'svelte/transition';
	import { Icon } from 'm3-svelte';
	import iconDashboard from '@ktibow/iconset-material-symbols/dashboard';
	import iconCourses from '@ktibow/iconset-material-symbols/school';
	import iconExams from '@ktibow/iconset-material-symbols/quiz';
	import iconCertificates from '@ktibow/iconset-material-symbols/workspace-premium';
	import iconArticles from '@ktibow/iconset-material-symbols/article';
	import iconSchedule from '@ktibow/iconset-material-symbols/calendar-today';
	import iconProfile from '@ktibow/iconset-material-symbols/person';
	import iconSettings from '@ktibow/iconset-material-symbols/settings';
	import iconLogout from '@ktibow/iconset-material-symbols/logout';
	import iconExpand from '@ktibow/iconset-material-symbols/expand-more';
	import iconCollapse from '@ktibow/iconset-material-symbols/expand-less';
	import iconHome from '@ktibow/iconset-material-symbols/home';
	import { authStore } from '$lib/stores/auth';

	type SubNavItem = {
		href?: string;
		icon: any;
		label: string;
		action?: () => void;
	};

	type NavItem = {
		href?: string;
		icon: any;
		label: string;
		children?: SubNavItem[];
	};

	const navItems: NavItem[] = [
		{ href: '/dashboard', icon: iconDashboard, label: 'Beranda' },
		{ href: '/dashboard/courses', icon: iconCourses, label: 'Kursus' },
		{ href: '/dashboard/exams', icon: iconExams, label: 'Ujian' },
		{ href: '/dashboard/certificates', icon: iconCertificates, label: 'Sertifikat' },
		{ href: '/dashboard/schedule', icon: iconSchedule, label: 'Jadwal' },
		{ href: '/dashboard/articles', icon: iconArticles, label: 'Artikel' },
		{
			icon: iconProfile,
			label: 'Profil',
			children: [
				{
					href: '/dashboard/profile',
					icon: iconSettings,
					label: 'Pengaturan Akun'
				},
				{ icon: iconLogout, label: 'Logout', action: async () => await logout() }
			]
		},
		{ href: '/dashboard/settings', icon: iconSettings, label: 'Pengaturan' }
	];

	let openMenus = $state<Set<string>>(new Set());

	let userName = $state('');
	let userId = $state('');

	// Subscribe to auth store
	authStore.subscribe((state) => {
		userName = state.user?.profileName || state.user?.username || '';
		userId = state.user?.id || '';
	});

	function getInitials(name: string): string {
		if (!name) return 'U';
		return name
			.split(' ')
			.map((word) => word[0])
			.join('')
			.toUpperCase()
			.substring(0, 2);
	}

	function toggleMenu(label: string) {
		if (openMenus.has(label)) {
			openMenus.delete(label);
		} else {
			openMenus.add(label);
		}
		openMenus = new Set(openMenus);
	}

	function isMenuOpen(label: string): boolean {
		return openMenus.has(label);
	}

	async function logout() {
		const result = await authStore.logout();
		if (result.success) {
			await goto('/');
		}
	}
</script>

<div class="dashboard-sidebar flex h-full flex-col bg-surface" transition:slide={{ axis: 'x', duration: 300 }}>
	<!-- User Info section -->
	<div class="border-b border-outline-variant p-4">
		<div class="flex items-center gap-3">
			<div
				class="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-semibold text-on-primary"
			>
				{getInitials(userName)}
			</div>
			<div class="min-w-0 flex-1">
				<p class="truncate text-sm font-medium text-on-surface">Halo!</p>
				<p class="truncate text-sm text-on-surface-variant">{userName}</p>
			</div>
		</div>
	</div>

	<!-- Navigation Items -->
	<nav class="flex-1 space-y-1 p-2">
		{#each navItems as item, index}
			<!-- Add divider before profile section -->
			{#if item.label === 'Profil'}
				<div class="border-t border-outline-variant mx-2 my-2"></div>
			{/if}
			
			{#if item.children}
				<!-- Item with sub-menu -->
				<div class="nav-item">
					<button
						class="nav-item-header flex w-full items-center gap-3 rounded-lg px-3 py-2 text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
						onclick={() => toggleMenu(item.label)}
					>
						<Icon icon={item.icon} class="h-5 w-5" />
						<span class="flex-1 text-left text-sm font-medium">{item.label}</span>
						<Icon icon={isMenuOpen(item.label) ? iconCollapse : iconExpand} class="h-4 w-4" />
					</button>

					{#if isMenuOpen(item.label)}
						<div class="mt-1 ml-4 space-y-1">
							{#each item.children as subItem}
								{#if subItem.action}
									<!-- Action button for logout -->
									<button
										class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
										onclick={subItem.action}
									>
										<Icon icon={subItem.icon} class="h-4 w-4" />
										<span class="text-sm font-medium">{subItem.label}</span>
									</button>
								{:else}
									<!-- Regular link -->
									<a
										href={subItem.href}
										class="nav-item flex items-center gap-3 rounded-lg px-3 py-2 text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface {$page
											.url.pathname === subItem.href
											? 'active'
											: ''}"
									>
										<Icon icon={subItem.icon} class="h-4 w-4" />
										<span class="text-sm font-medium">{subItem.label}</span>
									</a>
								{/if}
							{/each}
						</div>
					{/if}
				</div>
			{:else}
				<!-- Regular navigation item -->
				<a
					href={item.href}
					class="nav-item flex items-center gap-3 rounded-lg px-3 py-2 text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface {$page
						.url.pathname === item.href
						? 'active'
						: ''}"
				>
					<Icon icon={item.icon} class="h-5 w-5" />
					<span class="text-sm font-medium">{item.label}</span>
				</a>
			{/if}
		{/each}
	</nav>

	<!-- Back to Main Page Button -->
	<div class="border-t border-outline-variant p-2">
		<a
			href="/"
			class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
		>
			<Icon icon={iconHome} class="h-5 w-5" />
			<span class="text-sm font-medium">Kembali ke Halaman Utama</span>
		</a>
	</div>

	<!-- Footer info -->
	<div class="border-t border-outline-variant p-4">
		<p class="text-center text-xs text-on-surface-variant">Dashboard Pembelajaran</p>
	</div>
</div>

<style>
	.dashboard-sidebar {
		width: 280px;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 40;
		box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
	}

	.nav-item.active {
		background-color: var(--md-sys-color-surface-container-high);
		color: var(--md-sys-color-on-surface);
		font-weight: 600;
	}

	.nav-item-header {
		justify-content: space-between;
	}

	@media (max-width: 1024px) {
		.dashboard-sidebar {
			display: none; /* Hide on mobile, could add toggle later */
		}
	}
</style>
