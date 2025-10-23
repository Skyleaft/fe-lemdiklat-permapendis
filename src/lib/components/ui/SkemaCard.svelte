<script>
    import CheckoutButton from "@ktibow/iconset-material-symbols/add-shopping-cart"
    import { fade, fly,blur } from "svelte/transition";
    import { Button, Icon } from "m3-svelte";

    // Props for dynamic values
    export let imgSrc = "/img/img1.jpeg";
    export let title = "Skema Teknisi Jaringan Komputer";
    export let subtitle = "Uji kompetensi bagi yang ingin membuktikan kemampuan di bidang instalasi & pengelolaan jaringan komputer secara profesional.";
    export let imgAlt = "gambar 1";
</script>

<!-- Centering wrapper with animation -->
<div
    class="relative flex flex-col text-primary bg-surface-container-lowest shadow-md bg-clip-border rounded-xl"
    in:fly={{ y: 40, opacity: 0, duration: 450 }}
>
    <div
        class="relative mx-4 mt-4 overflow-hidden bg-clip-border rounded-xl h-55"
        in:fade={{ duration: 420, delay: 120 }}
    >
        <img
            src={imgSrc}
            alt="card-image"
            class="object-cover w-full h-full"
        />
    </div>
    <div class="p-6">
        <div class="flex items-center justify-between mb-2">
            <p
                class="block font-sans text-base antialiased font-bold leading-relaxed text-blue-gray-900"
                in:fly={{ y: 14, duration: 370, delay: 170 }}
            >
                {title}
            </p>
            <p class="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                <!-- Reserved for future use -->
            </p>
        </div>
        <p
            class="block font-sans text-sm antialiased font-normal leading-normal text-primary-dim opacity-75 line-clamp-2"
            in:fade={{ duration: 420, delay: 250 }}
        >
            {subtitle}
        </p>
    </div>
    <div class="flex flex-col p-6 pt-0" in:fade={{ duration: 430, delay: 320 }}>
        <Button variant="text" square iconType="left">
            <Icon icon={CheckoutButton}></Icon>Detail
        </Button>
    </div>
</div>