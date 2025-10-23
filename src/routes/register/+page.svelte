<script lang="ts">
  import {  Card, TextField,TextFieldOutlined,Button } from 'm3-svelte';
  let name = '';
  let email = '';
  let password = '';
  let confirmPassword = '';
  let errorMsg = '';
  let successMsg = '';
  
  function handleRegister(e: Event) {
    e.preventDefault();
    errorMsg = '';
    successMsg = '';
    if (!name || !email || !password || !confirmPassword) {
      errorMsg = 'Semua kolom wajib diisi.';
      return;
    }
    if (password !== confirmPassword) {
      errorMsg = 'Konfirmasi password tidak cocok.';
      return;
    }
    // TODO: Ganti dengan proses register backend-asli/submit API
    successMsg = 'Registrasi berhasil! Silakan cek email Anda untuk verifikasi.';
    name = '';
    email = '';
    password = '';
    confirmPassword = '';
  }
</script>

<div class="max-w-[540px] mx-auto my-20">
  <Card variant="elevated">
    <div class="p-6">
      <h1 class="text-2xl font-bold text-on-surface mb-2 text-center">Daftar Akun Baru</h1>
    <p class="text-on-surface-variant max-w-xs mx-auto text-center mb-6">Buat akun untuk mengikuti uji kompetensi di Lemdiklat MPI</p>
    <form class="space-y-4" on:submit|preventDefault={handleRegister}>
      <div class="flex flex-col gap-4">
        
        <TextFieldOutlined 
          label="Nama Lengkap"
          required
          bind:value={name}
          autocomplete="name"
        />
        <TextFieldOutlined
          label="Email"
          type="email"
          required
          bind:value={email}
          autocomplete="email"
        />
        <TextFieldOutlined
          label="Password"
          type="password"
          required
          bind:value={password}
          autocomplete="new-password"
        />
        <TextFieldOutlined
          label="Konfirmasi Password"
          type="password"
          required
          bind:value={confirmPassword}
          autocomplete="new-password"
        />
        <Button type="submit">Daftar</Button>
      </div>
      {#if errorMsg}
        <div class="text-error text-sm mt-1">{errorMsg}</div>
      {/if}
      {#if successMsg}
        <div class="text-primary text-sm mt-1">{successMsg}</div>
      {/if}
      <div class="mt-2 text-center text-sm text-on-surface-variant">
        Sudah punya akun? <a href="/" class="text-primary font-semibold hover:underline">Masuk</a>
      </div>
    </form>
    </div>
  </Card>
</div>
