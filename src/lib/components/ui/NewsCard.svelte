<script lang="ts">
  interface Props {
    title: string;
    excerpt: string;
    imageSrc: string;
    imageAlt: string;
    date: string;
    href?: string;
  }

  let { title, excerpt, imageSrc, imageAlt, date, href = "#" }: Props = $props();
</script>

<article class="bg-surface-container rounded-xl shadow-lg p-6 flex flex-col h-full">
  <img src={imageSrc} alt={imageAlt} class="w-full h-40 object-cover rounded-lg mb-4" />
  <h3 
    class="font-bold text-lg text-primary mb-2 line-clamp-2" 
    style="-webkit-line-clamp:2; display:-webkit-box; -webkit-box-orient:vertical; overflow:hidden;"
  >
    {title}
  </h3>
  <p class="text-on-surface-variant mb-3 flex-1 line-clamp-3" style="-webkit-line-clamp:3; display:-webkit-box; -webkit-box-orient:vertical; overflow:hidden;">
    {excerpt}
  </p>
  <a href={href} class="inline-block text-sm text-primary hover:underline font-semibold mb-2">Baca selengkapnya</a>
  <span class="text-xs text-on-surface-variant mt-auto">{date}</span>
</article>
