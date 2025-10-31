<script lang="ts">
import {  Button, Card, TextField,Icon } from "m3-svelte";
import FeatureCard from "$lib/components/ui/FeatureCard.svelte";
import SkemaCard from "$lib/components/ui/SkemaCard.svelte";
import TestimonialCard from "$lib/components/ui/TestimonialCard.svelte";
import NewsCard from "$lib/components/ui/NewsCard.svelte";
import { truncateContent, formatDate } from '$lib/utils/text';
import type { PageData } from './$types';

import { fade, fly, scale,blur } from 'svelte/transition';
import { onMount } from 'svelte';

export let data: PageData;

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
        class="grid grid-cols-3 grid-rows-2 gap-3 sm:gap-4 w-80 h-56 sm:w-96 sm:h-64"
      >
        <img
          src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=180&h=140&fit=crop&crop=center"
          alt="Gallery 1"
          class="object-cover rounded-xl w-full h-full shadow"
          in:scale={{ duration: 400, delay: 300 }}
        />
        <img
          src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=180&h=140&fit=crop&crop=center"
          alt="Gallery 2"
          class="object-cover rounded-xl w-full h-full shadow"
          in:scale={{ duration: 400, delay: 400 }}
        />
        <img
          src="https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=180&h=140&fit=crop&crop=center"
          alt="Gallery 3"
          class="object-cover rounded-xl w-full h-full shadow"
          in:scale={{ duration: 400, delay: 500 }}
        />
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=180&h=140&fit=crop&crop=center"
          alt="Gallery 4"
          class="object-cover rounded-xl w-full h-full shadow"
          in:scale={{ duration: 400, delay: 600 }}
        />
        <img
          src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=180&h=140&fit=crop&crop=center"
          alt="Gallery 5"
          class="object-cover rounded-xl w-full h-full shadow"
          in:scale={{ duration: 400, delay: 700 }}
        />
        <img
          src="https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=180&h=140&fit=crop&crop=center"
          alt="Gallery 6"
          class="object-cover rounded-xl w-full h-full shadow"
          in:scale={{ duration: 400, delay: 800 }}
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
        Karena komitmen kami untuk meningkatkan Lembaga Pendidikan dan Kompetensi oleh industri baik di tingkat nasional maupun internasional.
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
        Skema Pendidikan Dan Pelatihan
      </h2>
      <p 
        class="text-base md:text-lg text-primary-dim mb-8 text-center max-w-2xl mx-auto"
      >
        Berikut adalah beberapa skema Pelatihan yang tersedia, dirancang untuk memenuhi kebutuhan industri dan meningkatkan daya saing peserta.
      </p>
      <div 
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center max-w-6xl mx-auto"
      >
        <SkemaCard
          title="Pelatihan Kepala Sekolah MI/SD"
          subtitle="Program pelatihan komprehensif untuk kepala sekolah MI/SD dalam kepemimpinan pendidikan, manajemen sekolah, dan pengembangan kurikulum tingkat dasar."
          imgSrc="https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&h=300&fit=crop&crop=center"
          imgAlt="Pelatihan Kepala Sekolah MI/SD"
        />
        <SkemaCard
          title="Pelatihan Kepala Sekolah SMP"
          subtitle="Pelatihan khusus kepala sekolah SMP meliputi manajemen remaja, pengembangan karakter siswa, dan strategi pembelajaran efektif tingkat menengah pertama."
          imgSrc="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop&crop=center"
          imgAlt="Pelatihan Kepala Sekolah SMP"
        />
        <SkemaCard
          title="Pelatihan Kepala Sekolah SMA/SMK"
          subtitle="Program pelatihan untuk kepala sekolah SMA/SMK fokus pada persiapan siswa ke perguruan tinggi, link and match industri, dan pengembangan soft skills."
          imgSrc="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop&crop=center"
          imgAlt="Pelatihan Kepala Sekolah SMA/SMK"
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
    Testimoni dari para alumni yang telah mengikuti pelatihan dari kami. Mereka telah merasakan manfaatnya untuk karir dan pengembangan diri.
  </p>
  <div 
    class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
  >
    <TestimonialCard
      name="Dra. Siti Nurhaliza, M.Pd"
      role="Kepala SD Negeri 15 Jakarta"
      testimonial="Pelatihan kepemimpinan untuk kepala sekolah SD sangat membantu saya dalam mengelola sekolah dengan lebih efektif. Materi yang diberikan sangat aplikatif dan sesuai dengan tantangan di lapangan."
      imageSrc="https://ui-avatars.com/api/?name=Siti+Nurhaliza&background=6366f1&color=fff&size=100"
      imageAlt="Dra. Siti Nurhaliza"
    />
    <TestimonialCard
      name="Ahmad Fauzi, S.Pd, M.M"
      role="Kepala SMP Negeri 8 Bandung"
      testimonial="Program pelatihan untuk kepala sekolah SMP memberikan wawasan baru tentang manajemen remaja dan pengembangan karakter. Sangat bermanfaat untuk meningkatkan kualitas pendidikan di sekolah."
      imageSrc="https://ui-avatars.com/api/?name=Ahmad+Fauzi&background=059669&color=fff&size=100"
      imageAlt="Ahmad Fauzi"
    />
    <TestimonialCard
      name="Dr. Maya Sari, M.Pd"
      role="Kepala SMK Negeri 2 Surabaya"
      testimonial="Pelatihan kepala sekolah SMA/SMK sangat membantu dalam memahami link and match dengan industri. Sekarang sekolah kami lebih siap menyiapkan siswa untuk dunia kerja dan perguruan tinggi."
      imageSrc="https://ui-avatars.com/api/?name=Maya+Sari&background=dc2626&color=fff&size=100"
      imageAlt="Dr. Maya Sari"
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
    {#if data.articles && data.articles.length > 0}
      {#each data.articles as article}
        <NewsCard
          title={article.title}
          excerpt={truncateContent(article.content, 120)}
          imageSrc={article.thumbnail ? `/api/articles/thumbnail/${article.thumbnail}` : '/img/News-rafiki.svg'}
          imageAlt={article.title}
          date={formatDate(article.updatedAt)}
          href="/articles/{article.slug}"
          category={article.categoryName}
        />
      {/each}
    {:else}
      <div class="col-span-full text-center py-8">
        <p class="text-on-surface-variant">Belum ada berita terbaru.</p>
      </div>
    {/if}
  </div>
  <div class="mt-8 flex justify-center">
    <a
      href="/articles"
      class="px-6 py-2 rounded-lg bg-primary text-white font-semibold shadow hover:bg-primary-dim transition"
      >Berita lainnya</a
    >
  </div>
</section>

</div>