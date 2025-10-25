<script lang="ts">
  import { Button, Card } from 'm3-svelte';
  import {fly} from "svelte/transition";

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

<section in:fly={{duration:400,delay:200, y:10}}
class="hero bg-gradient-to-t from-bg to-primary-container text-primary  px-8 py-16 mb-10 flex flex-col items-center justify-center text-center">
  <h1 class="text-4xl font-bold mb-4">Kontak Kami</h1>
  <p class="text-lg mb-6 max-w-2xl">
    Hubungi kami untuk informasi program, kerja sama, atau pertanyaan lainnya.
  </p>

</section>

<section class="max-w-[1280px] mx-auto px-4 py-10">
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
            <div>Jl. Gedebage Selatan No.137 Kel. Cisaranteun Kidul, Kec. Gedebage, Kota Bandung 40295</div>
          </div>
          <div>
            <div class="font-semibold text-on-surface">Email</div>
            <a href="mailto:info@lemdiklat-permapendis.com" class="text-primary hover:underline">info@lemdiklat-permapendis.com</a>
          </div>
          <!-- <div>
            <div class="font-semibold text-on-surface">Telepon</div>
            <a href="tel:+62123456789" class="text-primary hover:underline">+62 123-456-789</a>
          </div> -->
        </div>
      </Card>

      <div class="rounded-lg overflow-hidden border border-outline-variant">
        <div class="aspect-[16/9] w-full">
          <iframe width="100%" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Jl.%20Gedebage%20Selatan%20No.137%20Kel.%20Cisaranteun%20Kidul,%20Kec.%20Gedebage,%20Kota%20Bandung%2040295+(Lemdiklat%20Permapendis)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.mapsdirections.info/it/calcola-la-popolazione-su-una-mappa/">popolazione comuni Italia mappa interattiva</a></iframe>
        </div>
      </div>
    </div>
  </div>

</section>


