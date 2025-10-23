<script lang="ts">
  interface Props {
    name: string;
    role: string;
    testimonial: string;
    imageSrc: string;
    imageAlt: string;
  }

  let { name, role, testimonial, imageSrc, imageAlt }: Props = $props();
</script>

<div class="bg-surface-container rounded-xl shadow-lg p-6 flex flex-col items-center">
  <img src={imageSrc} alt={imageAlt} class="w-16 h-16 rounded-full mb-4 object-cover" />
  <p class=" italic text-center mb-3">
    "{testimonial}"
  </p>
  <div class="text-sm text-primary font-semibold">{name}</div>
  <div class="text-xs text-primary-dim">{role}</div>
</div>
