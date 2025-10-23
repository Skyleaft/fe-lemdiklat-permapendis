<script lang="ts">
  import { Button,Icon,Dialog } from 'm3-svelte';
  let email = "";
  let subscribed = false;

  function subscribe() {
    if (email.trim()) {
      // You would call your subscribe endpoint here
      subscribed = true;
      email = "";
    }
  }
</script>

<footer class="w-full  bg-surface-container-low backdrop-blur z-40 mt-auto">
  <div class="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-on-surface">
    <!-- Info kontak -->
    <div>
      <h2 class="font-bold text-lg mb-2">Kontak Kami</h2>
      <p>Lemdiklat Permapendis</p>
      <p>Jalan Pendidikan No. 123<br/> Jakarta, Indonesia</p>
      <p class="mt-2">
        <span class="font-medium">Telp:</span> <a href="tel:+622112345678" class="hover:underline">+62 21 1234 5678</a>
      </p>
      <p>
        <span class="font-medium">Email:</span> <a href="mailto:info@lemdiklat-Permapendis.id" class="hover:underline">info@lemdiklat-permapendis.id</a>
      </p>
    </div>

    <!-- Navigasi Footer -->
    <div>
      <h2 class="font-bold text-lg mb-2">Navigasi</h2>
      <ul class="space-y-1">
        <li><a href="/" class="hover:underline">Beranda</a></li>
        <li><a href="/about" class="hover:underline">Tentang</a></li>
        <li><a href="/contact" class="hover:underline">Kontak</a></li>
      </ul>
    </div>

    <!-- Stay connected -->
    <div>
      <h2 class="font-bold text-lg mb-2">Stay Connected</h2>
      {#if !subscribed}
        <form class="flex flex-col sm:flex-row gap-2 mt-2" on:submit|preventDefault={subscribe}>
          <input
            class="w-full px-3 py-2 border border-outline rounded bg-surface text-on-surface placeholder-on-surface-variant focus:outline-none focus:border-primary transition-all"
            type="email"
            placeholder="Alamat email anda…"
            bind:value={email}
            required
            aria-label="Email untuk berlangganan"
          />
          <Button>Subscribe</Button>
        </form>
        <p class="text-xs text-on-surface-variant mt-1">Dapatkan info terbaru dari kami!</p>
      {:else}
        <div class="mt-2 text-primary font-semibold">
          Terima kasih telah berlangganan!
        </div>
      {/if}
    </div>
  </div>
  <div class="container mx-auto px-6 py-4 text-center text-xs text-on-surface-variant">
    &copy; {new Date().getFullYear()} Lemdiklat Permapendis. Hak cipta dilindungi undang-undang.
  </div>
</footer>




