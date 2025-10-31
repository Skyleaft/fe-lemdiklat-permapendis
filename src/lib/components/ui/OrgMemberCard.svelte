<script lang="ts">
  import { fly } from 'svelte/transition';
  
  interface Props {
    name: string;
    role: string;
    avatarBg?: string;
    delay?: number;
  }

  let { name, role, avatarBg = "6366f1", delay = 0 }: Props = $props();
  
  // Extract name without titles for avatar
  const extractName = (fullName: string) => {
    let result = fullName;
    // Remove titles repeatedly until no more matches
    while (/^(Prof\.|Dr\.|H\.|Hj\.|KH\.)\s+/.test(result)) {
      result = result.replace(/^(Prof\.|Dr\.|H\.|Hj\.|KH\.)\s+/, '');
    }
    // Remove degrees and certifications at the end
    result = result.replace(/,\s*(M\.\w+|S\.\w+|CIIQA|CEAM|CSQ|AIQA)+.*$/g, '');
    return result.trim();
  };
  
  const avatarName = extractName(name);
</script>

<div class="flex flex-col items-center p-4 bg-surface-container rounded-xl shadow-sm" in:fly={{ y: 20, duration: 400, delay }}>
  <img 
    src="https://ui-avatars.com/api/?name={encodeURIComponent(avatarName)}&background={avatarBg}&color=fff&size=80" 
    alt={name}
    class="w-20 h-20 rounded-full mb-3"
  />
  <h3 class="font-semibold text-sm text-center text-on-surface mb-1">{name}</h3>
  <p class="text-xs text-center text-on-surface-variant">{role}</p>
</div>