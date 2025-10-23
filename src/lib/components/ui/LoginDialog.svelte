<script>
    import { Dialog, TextField, TextFieldOutlined, Divider,Button,Icon } from "m3-svelte";
    import iconCircle from "@ktibow/iconset-material-symbols/account-circle";
    import iconCirclePass from "@ktibow/iconset-material-symbols/passkey";
    import iconClose from "@ktibow/iconset-material-symbols/close";
    import {Layer} from "m3-svelte";
    export let open = false;
    let username = "";
    let password = "";
</script>
<Dialog headline="Masuk" bind:open>
    {#snippet buttons()}
    <Button iconType="full" variant="text"><Icon icon={iconClose} /></Button>
    {/snippet}
    
    <form on:submit|preventDefault={() => {/* handle login logic here */}} class="p-4">
        <div class="flex flex-col gap-4">
            <TextFieldOutlined label="Username" leadingIcon={iconCircle} bind:value={username} type="text" autocomplete="username" required />
            <TextFieldOutlined label="Password" leadingIcon={iconCirclePass} bind:value={password} type="password" autocomplete="current-password" required />
        </div>
    <div class="flex flex-col gap-2 mt-4 w-100">
        <Button type="submit">Login</Button>
        <Button variant="text" type="reset">Batal</Button>
    </div>
    </form>
    <Divider></Divider>
    <div class="mt-4 text-center text-sm text-slate-600">
        Butuh bantuan? <b><a href="/help" class="text-primary hover:underline">Hubungi admin</a></b>
    </div>
    

  </Dialog>