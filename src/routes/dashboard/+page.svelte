<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { Button, Card } from 'm3-svelte';
	import { authStore } from '$lib/stores/auth';
	import type { UserData, ClaimUser } from '$lib/types';

	let userData: ClaimUser | null = null;
	let isLoading = $state(true);

	// Mock data - in real app, this would come from API
	let dashboardStats = {
		totalCertifications: 3,
		activeCourses: 2,
		upcomingExams: 1,
		completedCourses: 5
	};

	let recentCertifications = [
		{
			id: 1,
			name: 'Teknisi Jaringan Komputer',
			date: '2024-12-15',
			status: 'Passed',
			certificateNumber: 'LSP-001-2024-045'
		},
		{
			id: 2,
			name: 'Programmer Aplikasi',
			date: '2024-11-20',
			status: 'Passed',
			certificateNumber: 'LSP-002-2024-032'
		},
		{
			id: 3,
			name: 'Digital Marketing',
			date: '2024-10-10',
			status: 'Passed',
			certificateNumber: 'LSP-003-2024-018'
		}
	];

	let upcomingSchedules = [
		{
			id: 1,
			title: 'Pelatihan Advanced Networking',
			date: '2025-01-15',
			time: '09:00 - 17:00',
			location: 'Jakarta Training Center',
			type: 'Training'
		},
		{
			id: 2,
			title: 'Uji Kompetensi Web Developer',
			date: '2025-01-20',
			time: '10:00 - 12:00',
			location: 'Online',
			type: 'Exam'
		}
	];

	let activeCourses = [
		{
			id: 1,
			name: 'Full Stack Developer Bootcamp',
			progress: 75,
			nextSession: 'Pelatihan Database Design - 2025-01-10',
			instructor: 'Dr. Ahmad Rahman'
		},
		{
			id: 2,
			name: 'Cloud Computing Fundamentals',
			progress: 45,
			nextSession: 'AWS Services - 2025-01-12',
			instructor: 'Ibu Siti Aminah'
		}
	];

	onMount(() => {
		// Subscribe to auth store to get user data
		const unsubscribe = authStore.subscribe((state) => {
			userData = state.user;
			isLoading = state.isLoading;
		});

		// Check auth on mount
		authStore.checkAuth();

		return unsubscribe;
	});

	function getInitials(name: string): string {
		if (!name) return (userData?.username?.substring(0, 2) || 'U').toUpperCase();
		return name
			.split(' ')
			.map((word) => word[0])
			.join('')
			.toUpperCase()
			.substring(0, 2);
	}
</script>

<div class="mx-auto max-w-7xl">
	{#if isLoading}
		<div class="flex h-64 items-center justify-center">
			<div class="text-center">
				<div
					class="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-primary"
				></div>
				<p class="text-on-surface-variant">Memuat dashboard...</p>
			</div>
		</div>
	{:else}
		<!-- Welcome Section -->
		<div class="mb-8" in:fly={{ x: -20, duration: 600 }}>
			<div class="mb-4 flex items-center gap-4">
				<div
					class="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-on-primary"
				>
					{getInitials(userData?.profileName || userData?.username || '')}
				</div>
				<div>
					<h1 class="text-3xl font-bold text-on-surface">
						Selamat Datang, {userData?.profileName || userData?.username || 'Pengguna'}
					</h1>
					<p class="text-on-surface-variant">Dashboard pembelajaran dan sertifikasi Anda</p>
				</div>
			</div>
		</div>

		<!-- Stats Cards -->
		<div
			class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
			in:fly={{ y: 20, duration: 600, delay: 100 }}
		>
			<Card variant="elevated" class="border-l-4 border-primary">
				<div class="p-6">
					<div class="flex items-center justify-between">
						<div>
							<p class="text-sm font-medium text-on-surface-variant">Total Sertifikat</p>
							<p class="text-3xl font-bold text-primary">
								{dashboardStats.totalCertifications}
							</p>
						</div>
						<div
							class="flex h-12 w-12 items-center justify-center rounded-full bg-primary-container"
						>
							<svg
								class="h-6 w-6 text-primary"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
								></path>
							</svg>
						</div>
					</div>
				</div>
			</Card>

			<Card variant="elevated" class="border-l-4 border-secondary">
				<div class="p-6">
					<div class="flex items-center justify-between">
						<div>
							<p class="text-sm font-medium text-on-surface-variant">Kursus Aktif</p>
							<p class="text-3xl font-bold text-secondary">{dashboardStats.activeCourses}</p>
						</div>
						<div
							class="flex h-12 w-12 items-center justify-center rounded-full bg-secondary-container"
						>
							<svg
								class="h-6 w-6 text-secondary"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
								></path>
							</svg>
						</div>
					</div>
				</div>
			</Card>

			<Card variant="elevated" class="border-l-4 border-tertiary">
				<div class="p-6">
					<div class="flex items-center justify-between">
						<div>
							<p class="text-sm font-medium text-on-surface-variant">Ujian Mendatang</p>
							<p class="text-3xl font-bold text-tertiary">{dashboardStats.upcomingExams}</p>
						</div>
						<div
							class="flex h-12 w-12 items-center justify-center rounded-full bg-tertiary-container"
						>
							<svg
								class="h-6 w-6 text-tertiary"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
								></path>
							</svg>
						</div>
					</div>
				</div>
			</Card>

			<Card variant="elevated" class="border-l-4 border-error">
				<div class="p-6">
					<div class="flex items-center justify-between">
						<div>
							<p class="text-sm font-medium text-on-surface-variant">Kursus Selesai</p>
							<p class="text-3xl font-bold text-error">{dashboardStats.completedCourses}</p>
						</div>
						<div class="flex h-12 w-12 items-center justify-center rounded-full bg-error-container">
							<svg class="h-6 w-6 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								></path>
							</svg>
						</div>
					</div>
				</div>
			</Card>
		</div>

		<!-- Main Content Grid -->
		<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
			<!-- Recent Certifications -->
			<div in:fly={{ x: -20, duration: 600, delay: 200 }}>
				<Card variant="elevated">
					<div class="p-6">
						<div class="mb-6 flex items-center justify-between">
							<h2 class="text-xl font-semibold text-on-surface">Sertifikat Terbaru</h2>
							<a
								href="/certificates"
								class="rounded-lg px-3 py-2 text-primary transition-colors hover:bg-primary-container"
							>
								Lihat Semua
							</a>
						</div>

						<div class="space-y-4">
							{#each recentCertifications as cert}
								<div
									class="flex items-center gap-4 rounded-lg bg-surface-container-highest p-4 transition-colors hover:bg-surface-container-high"
								>
									<div
										class="flex h-12 w-12 items-center justify-center rounded-full bg-primary-container"
									>
										<svg
											class="h-6 w-6 text-primary"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
											></path>
										</svg>
									</div>
									<div class="flex-1">
										<h3 class="font-medium text-on-surface">{cert.name}</h3>
										<p class="text-sm text-on-surface-variant">{cert.certificateNumber}</p>
										<p class="text-sm text-on-surface-variant">
											Tanggal: {new Date(cert.date).toLocaleDateString('id-ID')}
										</p>
									</div>
									<div class="text-right">
										<span
											class="rounded-full bg-tertiary-container px-2 py-1 text-xs font-medium text-on-tertiary-container"
										>
											{cert.status}
										</span>
									</div>
								</div>
							{/each}
						</div>
					</div>
				</Card>
			</div>

			<!-- Upcoming Schedule -->
			<div in:fly={{ x: 20, duration: 600, delay: 300 }}>
				<Card variant="elevated">
					<div class="p-6">
						<div class="mb-6 flex items-center justify-between">
							<h2 class="text-xl font-semibold text-on-surface">Jadwal Mendatang</h2>
							<a
								href="/schedule"
								class="rounded-lg px-3 py-2 text-primary transition-colors hover:bg-primary-container"
							>
								Lihat Semua
							</a>
						</div>

						<div class="space-y-4">
							{#each upcomingSchedules as schedule}
								<div
									class="flex items-start gap-4 rounded-lg bg-surface-container-highest p-4 transition-colors hover:bg-surface-container-high"
								>
									<div
										class="flex h-12 w-12 items-center justify-center rounded-full bg-secondary-container"
									>
										<svg
											class="h-6 w-6 text-secondary"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
											></path>
										</svg>
									</div>
									<div class="flex-1">
										<h3 class="font-medium text-on-surface">{schedule.title}</h3>
										<p class="text-sm text-on-surface-variant">
											{new Date(schedule.date).toLocaleDateString('id-ID')} • {schedule.time}
										</p>
										<p class="flex items-center gap-1 text-sm text-on-surface-variant">
											<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
												></path>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
												></path>
											</svg>
											{schedule.location}
										</p>
									</div>
									<div class="text-right">
										<span
											class="rounded-full px-2 py-1 text-xs font-medium {schedule.type === 'Exam'
												? 'bg-tertiary-container text-on-tertiary-container'
												: 'bg-primary-container text-on-primary-container'}"
										>
											{schedule.type}
										</span>
									</div>
								</div>
							{/each}
						</div>
					</div>
				</Card>
			</div>
		</div>

		<!-- Active Courses -->
		<div class="mt-8" in:fly={{ y: 20, duration: 600, delay: 400 }}>
			<Card variant="elevated">
				<div class="p-6">
					<div class="mb-6 flex items-center justify-between">
						<h2 class="text-xl font-semibold text-on-surface">Kursus Aktif</h2>
						<a
							href="/courses"
							class="rounded-lg px-3 py-2 text-primary transition-colors hover:bg-primary-container"
						>
							Lihat Semua Kursus
						</a>
					</div>

					<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
						{#each activeCourses as course}
							<div
								class="rounded-lg border border-outline-variant p-6 transition-shadow hover:shadow-lg"
							>
								<h3 class="mb-2 text-lg font-semibold text-on-surface">{course.name}</h3>
								<p class="mb-4 text-sm text-on-surface-variant">
									Instruktur: {course.instructor}
								</p>

								<!-- Progress Bar -->
								<div class="mb-4">
									<div class="mb-2 flex justify-between text-sm text-on-surface-variant">
										<span>Progress</span>
										<span>{course.progress}%</span>
									</div>
									<div class="h-2 w-full rounded-full bg-surface-container-highest">
										<div
											class="h-2 rounded-full bg-primary transition-all duration-300"
											style="width: {course.progress}%"
										></div>
									</div>
								</div>

								<div class="mb-4 space-y-2 text-sm">
									<p class="text-on-surface-variant">
										<span class="font-medium">Sesua selanjutnya:</span>
									</p>
									<p class="text-on-surface">{course.nextSession}</p>
								</div>

								<div class="flex gap-3">
									<Button variant="filled">Lanjut Belajar</Button>
									<Button variant="outlined">Jadwal Lengkap</Button>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</Card>
		</div>

		<!-- Quick Actions -->
		<div class="mt-8" in:fly={{ y: 20, duration: 600, delay: 500 }}>
			<Card variant="elevated">
				<div class="p-6">
					<h2 class="mb-6 text-xl font-semibold text-on-surface">Aksi Cepat</h2>
					<div class="grid grid-cols-2 gap-4 md:grid-cols-4">
						<a
							href="/courses/enroll"
							class="flex h-20 flex-col items-center justify-center gap-2 rounded-lg bg-primary text-on-primary transition-colors hover:bg-primary-dim"
						>
							<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 6v6m0 0v6m0-6h6m-6 0H6"
								></path>
							</svg>
							<span class="text-sm">Daftar Kursus</span>
						</a>

						<a
							href="/exams/register"
							class="flex h-20 flex-col items-center justify-center gap-2 rounded-lg border border-outline transition-colors hover:border-primary hover:bg-primary-container"
						>
							<svg
								class="h-6 w-6 text-primary"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
								></path>
							</svg>
							<span class="text-sm text-primary">Daftar Ujian</span>
						</a>

						<a
							href="/certificates"
							class="flex h-20 flex-col items-center justify-center gap-2 rounded-lg border border-outline transition-colors hover:border-primary hover:bg-primary-container"
						>
							<svg
								class="h-6 w-6 text-primary"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								></path>
							</svg>
							<span class="text-sm text-primary">Sertifikat Saya</span>
						</a>

						<a
							href="/schedule"
							class="flex h-20 flex-col items-center justify-center gap-2 rounded-lg border border-outline transition-colors hover:border-primary hover:bg-primary-container"
						>
							<svg
								class="h-6 w-6 text-primary"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
								></path>
							</svg>
							<span class="text-sm text-primary">Jadwal Saya</span>
						</a>
					</div>
				</div>
			</Card>
		</div>
	{/if}
</div>
