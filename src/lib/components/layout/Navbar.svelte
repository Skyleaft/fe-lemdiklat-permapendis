<script lang="ts">
  import { page } from '$app/stores';
  import { Button, Icon, Dialog } from 'm3-svelte';
  import iconLight from "@ktibow/iconset-material-symbols/light-mode-outline";
  import iconDark from "@ktibow/iconset-material-symbols/dark-mode-outline";
  import LoginDialog from "$lib/components/ui/LoginDialog.svelte";

  type NavLink = { href: string; label: string };
  const navLinks: NavLink[] = [
    { href: '/', label: 'Beranda' },
    { href: '/about', label: 'Tentang' },
    { href: '/contact', label: 'Kontak' }
  ];

  let { toggleTheme }: { toggleTheme: () => void } = $props();

  let searchText = "";
  let showDark = $state(false);

  let isLogining = $state(false);

  let isMenuOpen = $state(false);
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }
</script>
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
  @media (min-width: 768px) {
    .mobile-nav-toggle,
    .mobile-nav-menu {
      display: none !important;
    }
  }
</style>

<header class="sticky top-0 z-50 bg-surface/80 backdrop-blur shadow-1">
  <div class="mx-auto flex items-center justify-between px-4 py-2 gap-2">
    <a href="/" class="font-bold text-primary  tracking-tight">Lemdiklat Permapendis</a>
    <form
      class="hidden md:block"
      role="search"
      aria-label="Cari"
      on:submit|preventDefault={() => {
        // Simple placeholder behavior: alert or implement routing
        if (searchText.trim()) {
          window.location.href = `/search?q=${encodeURIComponent(searchText)}`;
        }
      }}
    >
      <div class="relative flex items-center">
        <span class="absolute left-2 top-1/2 -translate-y-1/2  pointer-events-none">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path d="M10.5 3a7.5 7.5 0 1 1 0 15 7.5 7.5 0 0 1 0-15zm6.53 13.47a.75.75 0 1 1 1.06 1.06l-2.24 2.24a.75.75 0 0 1-1.06-1.06l2.24-2.24zM10.5 4.5a6 6 0 1 0 0 12 6 6 0 0 0 0-12z" fill="currentColor"/>
          </svg>
        </span>
        <input
          bind:value={searchText}
          type="search"
          placeholder="Cari..."
          class="rounded-sm pl-8 pr-3 py-1 border border-outline w-100 bg-surface focus:outline-none focus:border-primary transition-all placeholder-on-surface-variant text-sm text-on-surface"
          aria-label="Kotak pencarian"
        />
      </div>
    </form>

    <LoginDialog bind:open={isLogining} />
    

    <div class="hidden md:flex items-center gap-1">
      {#each navLinks as link}
        <Button
          href={link.href}
          aria-current={$page.url.pathname === link.href ? 'page' : undefined}
          square
          variant="text"
        >
          {link.label}
        </Button>
      {/each}
      <span class="mx-2 h-6 w-px bg-outline-variant inline-block align-middle"></span>
      <Button variant="outlined" onclick={() => (isLogining = true)}>Masuk</Button>
      <Button href="/register" variant="filled">Daftar</Button>
      <span class="mx-2 h-6 w-px bg-outline-variant inline-block align-middle"></span>
      <!-- Theme switch button (light/dark) for m3-svelte -->
      <Button variant="tonal" iconType="full" onclick={() => { showDark = !showDark; toggleTheme(); }}>
        <Icon icon={showDark ? iconLight : iconDark} />
      </Button>
    </div>

    <div class="md:hidden">
      <Button aria-label="Toggle navigation" onclick={()=>toggleMenu()}>
        <!-- Menu icon -->
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
          <path d="M3.75 6.75h16.5a.75.75 0 0 0 0-1.5H3.75a.75.75 0 0 0 0 1.5Zm0 6h16.5a.75.75 0 0 0 0-1.5H3.75a.75.75 0 0 0 0 1.5Zm0 6h16.5a.75.75 0 0 0 0-1.5H3.75a.75.75 0 0 0 0 1.5Z" />
        </svg>
      </Button>
    </div>
  </div>

  {#if isMenuOpen}
    <div class="md:hidden border-outline-variant bg-surface">
      <nav class="max-w-[1080px] mx-auto px-4 py-2 flex flex-col gap-1">
        {#each navLinks as link}
          <a
            href={link.href}
            aria-current={$page.url.pathname === link.href ? 'page' : undefined}
            class="px-3 py-2 rounded-md text-sm font-medium text-on-surface-variant hover:bg-surface-container hover:text-on-surface aria-[current=page]:text-on-surface aria-[current=page]:font-semibold"
            on:click={() => (isMenuOpen = false)}
          >
            {link.label}
          </a>
        {/each}

        <div class="pt-1">
          <Button onclick={() => (isMenuOpen = false)}>Tutup</Button>
        </div>
      </nav>
    </div>
  {/if}
</header>


