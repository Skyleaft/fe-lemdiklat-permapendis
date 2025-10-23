<script lang="ts">
  import { Button, Card } from 'm3-svelte';
</script>

<section class="max-w-[1280px] mx-auto px-4 py-10">
  <header class="mb-8">
    <h1 class="text-3xl font-bold text-on-surface mb-2">Tentang Lemdiklat MPI</h1>
    <p class="text-on-surface-variant max-w-2xl">
      Lembaga Pendidikan dan Pelatihan MPI berkomitmen meningkatkan kompetensi
      melalui program pelatihan terstruktur, instruktur berpengalaman, serta pendekatan
      pembelajaran modern yang berorientasi pada hasil.
    </p>
  </header>

  <div class="grid gap-4 md:grid-cols-2">
    <Card variant="elevated">
      <div class="p-4">
        <h2 class="text-xl font-semibold text-on-surface mb-2">Visi</h2>
        <p class="text-on-surface-variant">
          Menjadi pusat unggulan pengembangan kompetensi yang relevan dengan kebutuhan industri
          dan mendorong pembelajaran sepanjang hayat.
        </p>
      </div>
    </Card>

    <Card variant="elevated">
      <div class="p-4">
        <h2 class="text-xl font-semibold text-on-surface mb-2">Misi</h2>
        <ul class="list-disc pl-5 space-y-1 text-on-surface-variant">
          <li>Menyelenggarakan pelatihan berbasis praktik terbaik.</li>
          <li>Memfasilitasi sertifikasi dan peningkatan keterampilan.</li>
          <li>Berjejaring dengan dunia industri dan komunitas.</li>
        </ul>
      </div>
    </Card>
  </div>

  <div class="mt-8 grid gap-4 md:grid-cols-3">
    <Card variant="filled">
      <div class="p-4">
        <div class="font-semibold text-on-surface mb-1">Profesional</div>
        <p class="text-on-surface-variant text-sm">
          Instruktur berpengalaman dengan kurikulum adaptif dan terkini.
        </p>
      </div>
    </Card>
    <Card variant="filled">
      <div class="p-4">
        <div class="font-semibold text-on-surface mb-1">Kolaboratif</div>
        <p class="text-on-surface-variant text-sm">
          Kemitraan strategis untuk peluang belajar dan karier yang lebih luas.
        </p>
      </div>
    </Card>
    <Card variant="filled">
      <div class="p-4">
        <div class="font-semibold text-on-surface mb-1">Berorientasi Hasil</div>
        <p class="text-on-surface-variant text-sm">
          Fokus pada kompetensi nyata dan output yang terukur.
        </p>
      </div>
    </Card>
  </div>

  <div class="mt-10">
    <Button variant="tonal" href="/contact">Hubungi Kami</Button>
  </div>
</section>


