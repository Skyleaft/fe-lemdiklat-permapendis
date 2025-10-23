<script lang="ts">
  import { Button, Card } from 'm3-svelte';

  let name = '';
  let email = '';
  let message = '';

  function submitForm(e: Event) {
    e.preventDefault();
    // TODO: Integrate with your backend or email service
    alert('Terima kasih! Pesan Anda telah dikirim.');
    name = '';
    email = '';
    message = '';
  }
</script>

<section class="max-w-[1280px] mx-auto px-4 py-10">
  <header class="mb-8">
    <h1 class="text-3xl font-bold text-on-surface mb-2">Kontak</h1>
    <p class="text-on-surface-variant max-w-2xl">
      Hubungi kami untuk informasi program, kerja sama, atau pertanyaan lainnya.
    </p>
  </header>

  <div class="grid gap-6 md:grid-cols-2">
    <Card variant="elevated">
      <form class="p-4 space-y-4" on:submit|preventDefault={submitForm}>
        <div>
          <label for="contact-name" class="block text-sm font-medium text-on-surface mb-1">Nama</label>
          <input
            class="w-full rounded-md border border-outline px-3 py-2 bg-surface text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary"
            bind:value={name}
            id="contact-name"
            placeholder="Nama lengkap"
            required
          />
        </div>
        <div>
          <label for="contact-email" class="block text-sm font-medium text-on-surface mb-1">Email</label>
          <input
            type="email"
            class="w-full rounded-md border border-outline px-3 py-2 bg-surface text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary"
            bind:value={email}
            id="contact-email"
            placeholder="nama@example.com"
            required
          />
        </div>
        <div>
          <label for="contact-message" class="block text-sm font-medium text-on-surface mb-1">Pesan</label>
          <textarea
            rows={5}
            class="w-full rounded-md border border-outline px-3 py-2 bg-surface text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary"
            bind:value={message}
            id="contact-message"
            placeholder="Tulis pesan Anda di sini..."
            required
          ></textarea>
        </div>
        <div>
          <Button type="submit">Kirim Pesan</Button>
        </div>
      </form>
    </Card>

    <div class="space-y-4">
      <Card variant="elevated">
        <div class="p-4 space-y-2 text-on-surface-variant">
          <div>
            <div class="font-semibold text-on-surface">Alamat</div>
            <div>Jl. Contoh No. 123, Jakarta</div>
          </div>
          <div>
            <div class="font-semibold text-on-surface">Email</div>
            <a href="mailto:info@lemdiklat-permapendis.com" class="text-primary hover:underline">info@lemdiklat-permapendis.com</a>
          </div>
          <div>
            <div class="font-semibold text-on-surface">Telepon</div>
            <a href="tel:+62123456789" class="text-primary hover:underline">+62 123-456-789</a>
          </div>
        </div>
      </Card>

      <div class="rounded-lg overflow-hidden border border-outline-variant">
        <div class="aspect-[16/9] w-full">
          <iframe
            title="Lokasi pada Peta"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.674769326408!2d106.816635!3d-6.175387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e9f0b1b1a3%3A0x1a2b3c4d5e6f7a8b!2sMonas!5e0!3m2!1sid!2sid!4v1700000000000"
            width="100%"
            height="100%"
            style="border:0;"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</section>


