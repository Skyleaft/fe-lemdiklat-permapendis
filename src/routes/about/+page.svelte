<script lang="ts">
  import { Button, Card } from 'm3-svelte';
  import {fly} from "svelte/transition";
  import TeamMemberCard from "$lib/components/ui/TeamMemberCard.svelte";
  import type { TeamMember } from "$lib/types/TeamMember";

        const teamMembers: TeamMember[] = [
          {
            name: "Andi Wijaya",
            title: "Ketua Lemdiklat",
            img: "https://ui-avatars.com/api/?name=Andi+Wijaya&background=112244&color=fff&size=128",
            alt: "Andi Wijaya"
          },
          {
            name: "Rahma Dewi",
            title: "Manajer Program",
            img: "https://ui-avatars.com/api/?name=Rahma+Dewi&background=3074D9&color=fff&size=128",
            alt: "Rahma Dewi"
          },
          {
            name: "Fajar Utama",
            title: "Instruktur Senior",
            img: "https://ui-avatars.com/api/?name=Fajar+Utama&background=667788&color=fff&size=128",
            alt: "Fajar Utama"
          }
        ];

</script>
<section in:fly={{duration:400,delay:200, y:10}}
class="hero bg-gradient-to-t from-bg to-primary-container text-primary  px-8 py-16 mb-10 flex flex-col items-center justify-center text-center">
  <h1 class="text-4xl font-bold mb-4">Tentang Lemdiklat Permapendis</h1>
  <p class="text-lg mb-6 max-w-2xl">
    Lembaga Pendidikan dan Pelatihan MPI berkomitmen meningkatkan kompetensi
      melalui program pelatihan terstruktur, instruktur berpengalaman, serta pendekatan
      pembelajaran modern yang berorientasi pada hasil.
  </p>

</section>

<section class="max-w-[1280px] mx-auto px-4 py-10">

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
  
  <section class="mt-10 max-w-[1280px] mx-auto">
    <h2 class="text-2xl font-bold text-primary mb-6">Tim Kami</h2>
    <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
      <!-- Komponen Anggota Tim -->
      {#each teamMembers as member}
        <TeamMemberCard {member} />
      {/each}

    </div>
  </section>
</section>



