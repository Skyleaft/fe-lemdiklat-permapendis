<script>
    import { Card } from "m3-svelte";
    import { fade, fly,blur } from "svelte/transition";
    let { title, subtitle, icon } = $props();
</script>
<div class="relative flex flex-col text-primary bg-surface-container-lowest shadow-md bg-clip-border rounded-br-3xl rounded-tl-3xl p-4" in:fly={{duration:1000}}>
    <div class="flex flex-col items-center m3-scheme-primary text-primary"
             in:fly={{y:30, opacity:0, duration:800}}>
            <slot name="icon">
                {#if icon}
                    {@html icon}
                {/if}
            </slot>
            <div class="font-semibold text-lg text-center mb-2"
                 in:fly={{duration:300, delay:380}}>
                <slot name="title">{title}</slot>
            </div>
        </div>
        <div class="text-primary-dim text-center m3-font-body-large"
             in:fly={{duration:300, delay:600, y:-20}}>
            <slot name="subtitle">{subtitle}</slot>
        </div>
</div>
