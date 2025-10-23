<script lang="ts">
  import type { TeamMember } from '$lib/types/TeamMember';
  export let member: TeamMember;
</script>
  <div class="bg-surface rounded-2xl shadow-md border border-outline-variant flex flex-col items-center p-6 space-y-3 hover:shadow-lg transition-shadow duration-250">
    <img src={member.img} alt={member.alt ?? member.name} class="w-20 h-20 rounded-full border-4 border-primary mb-2 shadow" />
    <div class="font-semibold text-on-surface text-lg">{member.name}</div>
    <div class="text-on-surface-variant text-sm font-medium">{member.title}</div>
  </div>