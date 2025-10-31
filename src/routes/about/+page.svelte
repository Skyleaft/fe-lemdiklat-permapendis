<script lang="ts">
  import { Button, Card } from 'm3-svelte';
  import {fly} from "svelte/transition";
  import OrgMemberCard from '$lib/components/ui/OrgMemberCard.svelte';

</script>
<section in:fly={{duration:400,delay:200, y:10}}
class="hero bg-gradient-to-t from-bg to-primary-container text-primary  px-8 py-16 mb-10 flex flex-col items-center justify-center text-center">
  <h1 class="text-4xl font-bold mb-4">Tentang Lemdiklat Permapendis</h1>
  <p class="text-lg mb-6 max-w-2xl">
    Lembaga Pendidikan dan Pelatihan berkomitmen meningkatkan kompetensi
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
    <h2 class="text-2xl font-bold text-primary mb-6">Susunan Pengurus</h2>
    
    <!-- Dewan Pembina -->
    <div class="mb-8">
      <h3 class="text-lg font-semibold text-primary mb-4">Dewan Pembina</h3>
      <div class="mb-4">
        <h4 class="text-md font-medium text-primary mb-3">Ketua</h4>
        <div class="flex justify-center">
          <OrgMemberCard name="Prof. Dr. H. Badrudin" role="Ketua Dewan Pembina" avatarBg="1e3a8a" />
        </div>
      </div>
      <div>
        <h4 class="text-md font-medium text-primary mb-3">Anggota</h4>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <OrgMemberCard name="Prof. Dr. KH Moh. Khusnuridlo" role="Anggota Dewan Pembina" avatarBg="1e40af" delay={100} />
          <OrgMemberCard name="Prof. Dr. H. Fatah Syukur" role="Anggota Dewan Pembina" avatarBg="7c2d12" delay={200} />
          <OrgMemberCard name="Prof. Dr. Risnita" role="Anggota Dewan Pembina" avatarBg="059669" delay={300} />
          <OrgMemberCard name="Prof. Dr. Hj. Aan Komariah" role="Anggota Dewan Pembina" avatarBg="be185d" delay={400} />
          <OrgMemberCard name="Prof. Dr. H. Subaidi" role="Anggota Dewan Pembina" avatarBg="7c3aed" delay={500} />
          <OrgMemberCard name="Prof. Dr. Dedy Achmad Kurniady" role="Anggota Dewan Pembina" avatarBg="ea580c" delay={600} />
        </div>
      </div>
    </div>

    <!-- Dewan Pengarah -->
    <div class="mb-8">
      <h3 class="text-lg font-semibold text-primary mb-4">Dewan Pengarah</h3>
      <div class="mb-4">
        <h4 class="text-md font-medium text-primary mb-3">Ketua</h4>
        <div class="flex justify-center">
          <OrgMemberCard name="Prof. Dr. H. Atiqullah" role="Ketua Dewan Pengarah" avatarBg="991b1b" />
        </div>
      </div>
      <div>
        <h4 class="text-md font-medium text-primary mb-3">Anggota</h4>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <OrgMemberCard name="Prof. Dr. H. Budiman" role="Anggota Dewan Pengarah" avatarBg="0891b2" />
          <OrgMemberCard name="Prof. Dr. KH. Zamroni" role="Anggota Dewan Pengarah" avatarBg="a21caf" />
          <OrgMemberCard name="Prof. Dr. H. Imam Makruf" role="Anggota Dewan Pengarah" avatarBg="166534" />
          <OrgMemberCard name="Prof. Dr. Imam Machali" role="Anggota Dewan Pengarah" avatarBg="b45309" />
          <OrgMemberCard name="Prof. Dr. Hj. Siti Patimah" role="Anggota Dewan Pengarah" avatarBg="4338ca" />
          <OrgMemberCard name="Dr. KH. Hasan Baharun" role="Anggota Dewan Pengarah" avatarBg="0f766e" />
          <OrgMemberCard name="Dr. Fahrurrozi" role="Anggota Dewan Pengarah" avatarBg="a16207" />
          <OrgMemberCard name="Dr. H. Badrud Tamam" role="Anggota Dewan Pengarah" avatarBg="7e22ce" />
          <OrgMemberCard name="Dr. Junaidah" role="Anggota Dewan Pengarah" avatarBg="c2410c" />
          <OrgMemberCard name="Dr. H. Cece Nurhikmah" role="Anggota Dewan Pengarah" avatarBg="0d9488" />
          <OrgMemberCard name="Dr. Hj. St. Syamsudduha" role="Anggota Dewan Pengarah" avatarBg="dc2626" />
          <OrgMemberCard name="Dr. H. Abdullah Aminuddin Aziz" role="Anggota Dewan Pengarah" avatarBg="1e3a8a" />
          <OrgMemberCard name="Dr. Fatkuroji" role="Anggota Dewan Pengarah" avatarBg="059669" />
        </div>
      </div>
    </div>

    <!-- Direktur -->
    <div class="mb-8">
      <h3 class="text-lg font-semibold text-primary mb-4">Direktur</h3>
      <div class="flex justify-center">
        <OrgMemberCard name="Dr. H. Dadan F Ramdhan" role="Direktur Lemdiklat PERMA Pendis Indonesia" avatarBg="dc2626" />
      </div>
    </div>

    <!-- Wakil Direktur -->
    <div class="mb-8">
      <h3 class="text-lg font-semibold text-primary mb-4">Wakil Direktur</h3>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <OrgMemberCard name="Dr. M. Wafiyul Ahdi" role="Wakil Bidang Program dan Kurikulum Diklat" avatarBg="059669" delay={100} />
        <OrgMemberCard name="Dr. H. Cece Hidayat" role="Wakil Bidang Administrasi dan Umum" avatarBg="7c3aed" delay={200} />
        <OrgMemberCard name="Dr. Mona Novita" role="Wakil Bidang Kemitraan, Publikasi, dan Humas" avatarBg="ea580c" delay={300} />
      </div>
    </div>

    <!-- Sekretaris & Bendahara -->
    <div class="mb-8">
      <h3 class="text-lg font-semibold text-primary mb-4">Sekretaris & Bendahara</h3>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <OrgMemberCard name="Dr. H. Akmal Mundiri" role="Sekretaris" avatarBg="0891b2" />
        <OrgMemberCard name="Chyril Futuhana Ahmad" role="Wakil Sekretaris" avatarBg="0d9488" />
        <OrgMemberCard name="Dr. Ambar Sri Lestari" role="Bendahara" avatarBg="c2410c" />
        <OrgMemberCard name="Dr. Hj. Euis Damayanti" role="Wakil Bendahara" avatarBg="be185d" />
      </div>
    </div>

    <!-- Kepala Bagian -->
    <div class="mb-8">
      <h3 class="text-lg font-semibold text-primary mb-4">Kepala Bagian dan Unit</h3>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <OrgMemberCard name="Dr. H. Abu Choir" role="Kepala Bagian Perencanaan dan Penyelenggaraan Diklat" avatarBg="7c2d12" />
        <OrgMemberCard name="Dr. Hj. Atiyah Suharti" role="Kepala Bagian Pengembangan Kurikulum Diklat" avatarBg="a21caf" />
        <OrgMemberCard name="Dr. Abdulloh Hamid" role="Kepala Bagian SDM Kediklatan" avatarBg="166534" />
        <OrgMemberCard name="Dr. Yudin Citriadin" role="Kepala Bagian Evaluasi Diklat" avatarBg="1e40af" />
        <OrgMemberCard name="Ilham Agustian Widia Yusuf" role="Kepala Bagian Administrasi dan Umum" avatarBg="b45309" />
        <OrgMemberCard name="Dr. Nunu Mahnun" role="Kepala Bagian Publikasi dan Humas" avatarBg="991b1b" />
        <OrgMemberCard name="Aqil Baihaqi" role="Kepala Bagian Kemitraan" avatarBg="4338ca" />
        <OrgMemberCard name="Dr. H. Enjang Yusuf Ali" role="Kepala Bagian TIK" avatarBg="0f766e" />
        <OrgMemberCard name="Dr. Atep Suherman" role="Kepala Unit Sarana dan Prasarana" avatarBg="a16207" />
        <OrgMemberCard name="Dr. H. Hasbiyallah" role="Kepala Unit Pengendalian Mutu" avatarBg="7e22ce" />
      </div>
    </div>
  </section>
</section>



