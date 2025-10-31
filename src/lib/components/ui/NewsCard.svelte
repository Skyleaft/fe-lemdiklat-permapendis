<script lang="ts">
  import Chip from './Chip.svelte';

  interface Props {
    title: string;
    excerpt: string;
    imageSrc: string;
    imageAlt: string;
    date: string;
    href?: string;
    category?: string;
  }

  let { title, excerpt, imageSrc, imageAlt, date, href = "#", category }: Props = $props();

  function handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNzUgMTI1SDE4NVYxMzVIMTc1VjEyNVoiIGZpbGw9IiM5Q0EzQUYiLz4KPHA+dGggZD0iTTE2NSAxNDVIMjM1VjE1NUgxNjVWMTQ1WiIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNMTY1IDE2NUgyMTVWMTc1SDE2NVYxNjVaIiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPgo=';
    img.alt = 'Gambar tidak tersedia';
  }
</script>

<article class=" rounded-xl p-6 flex flex-col h-full transition-all duration-500 hover:shadow-lg hover:bg-surface-container-lowest/70 hover:scale-105">
  <img src={imageSrc} alt={imageAlt} class="w-full h-40 object-cover rounded-lg mb-4" onerror={handleImageError} />
  <a href={href} class="block">
    <h3 
      class="font-bold text-lg text-primary mb-2 line-clamp-2 hover:underline cursor-pointer" 
      style="-webkit-line-clamp:2; display:-webkit-box; -webkit-box-orient:vertical; overflow:hidden;"
    >
      {title}
    </h3>
  </a>
  <div class="text-on-surface-variant mb-3 flex-1 line-clamp-3" style="-webkit-line-clamp:3; display:-webkit-box; -webkit-box-orient:vertical; overflow:hidden;">
    {@html excerpt}
  </div>
  <div class="flex items-center justify-between mt-auto">
    <span class="text-xs text-on-surface-variant">{date}</span>
    {#if category}
      <Chip label={category} variant="default" size="sm" />
    {/if}
  </div>
</article>
