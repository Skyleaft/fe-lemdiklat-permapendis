<script lang="ts">
    import { Dialog, TextFieldOutlined, Divider, Button, Icon } from "m3-svelte";
    import iconCircle from "@ktibow/iconset-material-symbols/account-circle";
    import iconCirclePass from "@ktibow/iconset-material-symbols/passkey";
    import iconClose from "@ktibow/iconset-material-symbols/close";
    import iconSpinner from "@ktibow/iconset-material-symbols/progress-activity";
    import { authStore } from "$lib/stores/auth";

    export let open = false;
    let username = "";
    let password = "";
    let errorMessage = "";
    let isLoading = false;
    let closeDialog = () => (open = false);

    async function handleLogin() {
        if (!username || !password) return;

        isLoading = true;
        errorMessage = "";

        const result = await authStore.login(username, password);

        if (result.success) {
            username = "";
            password = "";
            closeDialog();
        } else {
            errorMessage = result.message;
        }

        isLoading = false;
    }

    function handleReset() {
        username = "";
        password = "";
        errorMessage = "";
    }
</script>

<Dialog headline="Masuk" bind:open>
    {#snippet buttons()}
        <Button iconType="full" variant="text" disabled={isLoading} onclick={closeDialog}>
            <Icon icon={iconClose} />
        </Button>
    {/snippet}

    <form on:submit|preventDefault={handleLogin} class="p-4">
        <div class="flex flex-col gap-4">
            <TextFieldOutlined
                label="Username"
                leadingIcon={iconCircle}
                bind:value={username}
                type="text"
                autocomplete="username"
                required
                disabled={isLoading}
            />
            <TextFieldOutlined
                label="Password"
                leadingIcon={iconCirclePass}
                bind:value={password}
                type="password"
                autocomplete="current-password"
                required
                disabled={isLoading}
            />
        </div>

        {#if errorMessage}
            <p class="text-red-600 text-sm mt-2">{errorMessage}</p>
        {/if}

        <div class="flex flex-col gap-2 mt-4 w-100">
            <Button type="submit" disabled={isLoading}>
                {#if isLoading}
                    <Icon icon={iconSpinner} class="animate-spin mr-2" />
                    Masuk...
                {:else}
                    Masuk
                {/if}
            </Button>
            <Button variant="text" type="reset" disabled={isLoading} onclick={handleReset}>
                Batal
            </Button>
        </div>
    </form>
    <Divider />
    <div class="mt-4 text-center text-sm text-slate-600">
        Butuh bantuan? <b><a href="/help" class="text-primary hover:underline">Hubungi admin</a></b>
    </div>
</Dialog>
