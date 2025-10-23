<script lang="ts">
import {  Button, Card, TextField,Icon } from "m3-svelte";
import FeatureCard from "$lib/components/ui/FeatureCard.svelte";
import SkemaCard from "$lib/components/ui/SkemaCard.svelte";
import TestimonialCard from "$lib/components/ui/TestimonialCard.svelte";
import NewsCard from "$lib/components/ui/NewsCard.svelte";

import { fade, fly, scale,blur } from 'svelte/transition';
import { onMount } from 'svelte';

let heroSection: HTMLElement | undefined;

// Hero section states
let titleVisible = false;
let subtitleVisible = false;
let galleryVisible = false;

onMount(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target === heroSection) {
          setTimeout(() => { titleVisible = true; }, 100);
          setTimeout(() => { subtitleVisible = true; }, 300);
          setTimeout(() => { galleryVisible = true; }, 100);
          observer.unobserve(entry.target);
        }
      });
    },
    { root: null, rootMargin: "0px 0px -35% 0px", threshold: 0.6 }
  );

  if (heroSection) {
    observer.observe(heroSection);
  }

  return () => {
    if (heroSection) observer.unobserve(heroSection);
  };
});
</script>

<div class="container mx-auto max-w-[1280px]">

<section 
  bind:this={heroSection}
  class="rounded-[26px] flex flex-col-reverse md:flex-row items-center justify-between my-6 mx-2 md:my-8 md:mx-8 shadow-md px-3 py-6 md:py-0 md:px-10 bg-gradient-to-br from-bg to-primary-container
  min-h-[400px]"
>
  <!-- Left: Title and Subtitle -->
  <div class="w-full md:flex-1 flex flex-col items-center md:items-start justify-center">
    {#if titleVisible}
      <h1 
        class="text-2xl sm:text-3xl md:text-5xl font-bold text-primary tracking-tight text-center md:text-left"
        in:fly={{ x: -50, duration: 600, delay: 100 }}
      >
        Selamat Datang di Lemdiklat Permapendis
      </h1>
    {/if}
    {#if subtitleVisible}
      <p 
        class="mt-3 text-base md:text-lg text-primary-dim text-center md:text-left"
        in:fly={{ x: -30, duration: 500, delay: 200 }}
      >
        <em>Note: website masih dalam tahap pengembangan</em>
      </p>
    {/if}
  </div>
  <!-- Right: Image Gallery -->
  <div class="w-full md:flex-1 flex items-center justify-center mb-4 md:mb-0">
    {#if galleryVisible}
      <div 
        class="grid grid-cols-2 grid-rows-2 gap-2 sm:gap-3 w-52 h-52 sm:w-64 sm:h-64"
        in:blur={{ duration: 400, delay: 300 }}
      >
        <img
          src="https://source.unsplash.com/random/200x200?education,1"
          alt="Gallery 1"
          class="row-span-2 col-span-1 object-cover rounded-xl w-full h-full shadow"
        />
        <img
          src="https://source.unsplash.com/random/300x140?education,2"
          alt="Gallery 2"
          class="row-span-1 col-span-1 object-cover rounded-xl w-full h-full shadow"
        />
        <img
          src="https://source.unsplash.com/random/300x110?education,3"
          alt="Gallery 3"
          class="row-span-1 col-span-1 object-cover rounded-xl w-full h-full shadow"
        />
      </div>
    {/if}
  </div>
</section>


  <section class="my-16 mx-8">
      <h2 
        class="text-2xl md:text-3xl font-bold text-primary mb-4 text-center"
      >
        Mengapa Memilih Kami?
      </h2>
      <p 
        class="text-base md:text-lg text-primary-dim mb-8 text-center max-w-2xl mx-auto"
      >
        Karena komitmen kami untuk meningkatkan kebertrimaan Sertifikat Kompetensi oleh industri baik di tingkat nasional maupun internasional.
      </p>
      <div 
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
      <FeatureCard
        title="Pengalaman & Kompeten"
        subtitle="Instruktur berpengalaman dan profesional di bidang pendidikan dan pelatihan."
        icon={`
          <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 3c-2.97 0-5.4 2.16-5.91 5H5a2 2 0 0 0-2 2v6.5A2.5 2.5 0 0 0 5.5 19h13a1.5 1.5 0 0 0 1.5-1.5V10a7 7 0 0 0-7-7Zm0 2a5 5 0 0 1 5 5v7h-10V10a5 5 0 0 1 5-5Z"/>
          </svg>
        `}
      />
      <FeatureCard
        title="Materi Berkualitas"
        subtitle="Kurikulum dan materi pelatihan selalu diperbarui mengikuti kebutuhan terkini."
        icon={`
          <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
            <path fill="currentColor" d="M4 19V5a1 1 0 0 1 1.45-.89l7 4.11a1 1 0 0 0 1.1 0l7-4.11A1 1 0 0 1 20 5v14a1 1 0 0 1-1.45.89l-7-4.11a1 1 0 0 0-1.1 0l-7 4.11A1 1 0 0 1 4 19Z"/>
          </svg>
        `}
      />
      <FeatureCard
        title="Pendekatan Inovatif"
        subtitle="Metode belajar aktif dan interaktif yang mendorong partisipasi peserta."
        icon={`
          <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm4 12H8a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Z"/>
          </svg>
        `}
      />
      <FeatureCard
        title="Relasi & Jejaring Luas"
        subtitle="Akses komunitas dan jejaring alumni untuk pengembangan karir lebih lanjut."
        icon={`
          <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5ZM3 20.2V18a7 7 0 0 1 14 0v2.2a1 1 0 0 1-.91 1A15.39 15.39 0 0 1 12 22a15.39 15.39 0 0 1-6.09-0.8A1 1 0 0 1 3 20.2Z"/>
          </svg>
        `}
      />
      </div>
  </section>

  <section class="my-16 mx-8">
      <h2 
        class="text-2xl md:text-3xl font-bold text-primary mb-4 text-center"
      >
        Skema Uji Kompetensi di LSP Kami
      </h2>
      <p 
        class="text-base md:text-lg text-primary-dim mb-8 text-center max-w-2xl mx-auto"
      >
        Berikut adalah beberapa skema uji kompetensi yang tersedia di LSP kami, dirancang untuk memenuhi kebutuhan industri dan meningkatkan daya saing peserta.
      </p>
      <div 
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center max-w-6xl mx-auto"
      >
      <SkemaCard 
        imgAlt="Skema Teknisi Jaringan Komputer" 
        imgSrc="/img/img1.jpeg" 
        title="Skema Teknisi Jaringan Komputer"
        subtitle="Uji kompetensi bagi yang ingin membuktikan kemampuan di bidang instalasi & pengelolaan jaringan komputer secara profesional." 
      />
      <SkemaCard 
        imgAlt="Skema Programmer Aplikasi" 
        imgSrc="/img/img2.jpeg" 
        title="Skema Programmer Aplikasi"
        subtitle="Sertifikasi untuk kompetensi di pengembangan aplikasi, baik web, mobile, maupun desktop dengan standar industri terkini."
      />
      <SkemaCard 
        imgAlt="Skema Digital Marketing" 
        imgSrc="/img/img3.jpeg" 
        title="Skema Digital Marketing"
        subtitle="Validasi kemampuan Anda dalam strategi pemasaran digital, pengelolaan kampanye, dan analisis media sosial."
      />
      </div>
  </section>

<section class="my-16 mx-8">
  <h2 
    class="text-2xl md:text-3xl font-bold text-primary mb-4 text-center"
  >
    Kata Para Alumni
  </h2>
  <p 
    class="text-base md:text-lg text-primary-dim  mb-8 text-center max-w-2xl mx-auto"
  >
    Testimoni dari para alumni yang telah mengikuti uji kompetensi di LSP kami. Mereka telah merasakan manfaatnya untuk karir dan pengembangan diri.
  </p>
  <div 
    class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
  >
    <TestimonialCard
      name="Ani Rahmawati"
      role="Programmer Aplikasi"
      testimonial="Pengalaman uji kompetensi di LSP ini sangat menyenangkan. Prosesnya profesional & membuat saya lebih percaya diri di dunia kerja."
      imageSrc="/img/alumni1.jpg"
      imageAlt="Alumni 1"
    />
    <TestimonialCard
      name="Budi Santoso"
      role="Teknisi Jaringan Komputer"
      testimonial="Selain uji kompetensi, saya juga mendapatkan jejaring alumni yang luas dan sangat bermanfaat untuk perkembangan karir saya."
      imageSrc="/img/alumni2.jpg"
      imageAlt="Alumni 2"
    />
    <TestimonialCard
      name="Clara Dewi"
      role="Digital Marketing"
      testimonial="Materi dan metode uji sangat relevan dengan kebutuhan industri saat ini. Sertifikasi dari LSP ini menjadi nilai plus di CV saya."
      imageSrc="/img/alumni3.jpg"
      imageAlt="Alumni 3"
    />
  </div>
</section>

<section class="my-16 mx-8">
  <h2 
    class="text-2xl md:text-3xl font-bold text-on-surface mb-4 text-center"
  >
    Berita Terbaru
  </h2>
  <p 
    class="text-base md:text-lg text-on-surface-variant mb-8 text-center max-w-2xl mx-auto"
  >
    Update terbaru seputar kegiatan, informasi, dan pengumuman dari Lemdiklat Permapendis.
  </p>
  <div 
    class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
  >
    <NewsCard
      title="Sukses! Sertifikasi Batch 3 Telah Dilaksanakan"
      excerpt="Kegiatan sertifikasi batch ke-3 berlangsung lancar di Jakarta, diikuti 50 peserta dari berbagai institusi. Terima kasih atas partisipasi semuanya!"
      imageSrc="/img/berita1.jpg"
      imageAlt="Kegiatan Sertifikasi Batch 3"
      date="20 Juni 2024"
    />
    <NewsCard
      title="Lemdiklat Permapendis Jalin Kerjasama dengan Industri TIK"
      excerpt="Penandatanganan MoU dengan perusahaan teknologi terkemuka untuk meningkatkan relevansi materi dan penyerapan tenaga kerja bersertifikat."
      imageSrc="/img/berita2.jpg"
      imageAlt="Kerjasama Baru"
      date="12 Juni 2024"
    />
    <NewsCard
      title="Pelatihan Digital Marketing untuk Alumni"
      excerpt="Alumni peserta LSP mendapatkan pelatihan gratis tentang teknik digital marketing modern sebagai bagian pengembangan kompetensi berkelanjutan."
      imageSrc="/img/berita3.jpg"
      imageAlt="Pelatihan Digital Marketing"
      date="5 Juni 2024"
    />
  </div>
  <div class="mt-8 flex justify-center">
    <a
      href="/berita"
      class="px-6 py-2 rounded-lg bg-primary text-white font-semibold shadow hover:bg-primary-dim transition"
      >Berita lainnya</a
    >
  </div>
</section>

</div>