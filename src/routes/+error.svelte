<script>
    export let status;
    export let error;
  </script>
  
  <svelte:head>
    <title>{status === 404 ? 'Halaman tidak ditemukan' : 'Terjadi kesalahan'}</title>
  </svelte:head>
  
  <main class="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-b from-gray-50 to-gray-100 p-6">
    <!-- SVG Ilustrasi -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 600"
      class="w-72 h-72 mb-8 text-gray-600"
    >
      <circle cx="400" cy="300" r="200" fill="#e5e7eb" />
      <path
        d="M300 280h40v100h-40zM460 280h40v100h-40zM340 330h120v30H340z"
        fill="#9ca3af"
      />
      <text
        x="400"
        y="310"
        text-anchor="middle"
        font-size="100"
        font-weight="bold"
        fill="#4b5563"
        dy=".3em"
      >
        404
      </text>
    </svg>
  
    <!-- Judul dan Pesan -->
    {#if status === 404}
      <h1 class="text-4xl font-bold text-gray-800 mb-3">Halaman Tidak Ditemukan</h1>
      <p class="text-gray-600 mb-6 max-w-md">
        Maaf, halaman yang Anda cari tidak ada atau sudah dipindahkan.
      </p>
    {:else}
      <h1 class="text-4xl font-bold text-gray-800 mb-3">Terjadi Kesalahan</h1>
      <p class="text-gray-600 mb-6 max-w-md">
        {error?.message ?? 'Terjadi kesalahan pada server.'}
      </p>
    {/if}
  
    <!-- Tombol Kembali -->
    <a
      href="/"
      class="px-5 py-2 rounded-full bg-primary text-white hover:bg-on-primary-fixed transition-all duration-200 shadow-md"
    >
      Kembali ke Beranda
    </a>
  </main>
  