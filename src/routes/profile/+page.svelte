<script lang="ts">
  import { page } from '$app/stores';
  import { invalidateAll } from '$app/navigation';
  import { Button, Card, TextField, Icon } from 'm3-svelte';
  import { onMount, onDestroy } from 'svelte';
  import { authStore } from '$lib/stores/auth';
  import { buildApiUrl } from '$lib/utils/api';
  import type { UserData } from '$lib/types';
  import iconEdit from "@ktibow/iconset-material-symbols/edit";
  import iconCamera from "@ktibow/iconset-material-symbols/photo-camera";

import { fade, fly, scale,blur } from 'svelte/transition';

  let { data }: { data: { user: UserData } } = $props(); // Always UserData now

  let user = data.user;

  let isEditing = $state(false);
  let isLoading = $state(false);
  let isSaving = $state(false);
  let message = $state('');
  let messageType = $state<'success' | 'error' | 'info'>('info');

  // Editable form fields
  let usernameField = $state('');
  let profileNameField = $state('');
  let emailField = $state('');
  let phoneField = $state('');
  let addressField = $state('');
  let cityField = $state('');

  // Photo upload dialog
  let showPhotoDialog = $state(false);
  let selectedFile = $state<File | null>(null);
  let isUploading = $state(false);
  let photoMessage = $state('');
  let photoMessageType = $state<'success' | 'error' | 'info'>('info');
  let imageRefreshKey = $state(Date.now()); // Image refresh key using current timestamp

  // Get profile data for display from UserData structure
  let displayData = $derived(() => {
    return {
      username: user.username,
      profileName: user.userProfile.name,
      email: user.userProfile.email,
      phone: user.userProfile.phone || '',
      address: user.userProfile.address || '',
      city: user.userProfile.city || '',
      userId: user.id,
      roleName: user.role.name || `Role ${user.role.id}`
    };
  });

  function startEditing() {
    isEditing = true;
    const data = displayData();
    usernameField = data.username;
    profileNameField = data.profileName;
    emailField = data.email;
    phoneField = data.phone;
    addressField = data.address;
    cityField = data.city;
    message = '';
  }

  function cancelEditing() {
    isEditing = false;
    message = '';
  }

  async function saveProfile(e: Event) {
    e.preventDefault();
    isSaving = true;
    message = '';

    try {
      // API call to update profile using correct endpoint and schema
      const response = await fetch(buildApiUrl(`api/users/${user.id}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: profileNameField,
          email: emailField,
          phone: phoneField,
          address: addressField,
          city: cityField,
          profilePicture: user.userProfile.profilePicture
        }),
        credentials: 'include'
      });

      // Check if response is successful (204 No Content as per OpenAPI)
      if (response.ok) {
        // Update local user data
        user = {
          ...user,
          userProfile: {
            ...user.userProfile,
            name: profileNameField,
            email: emailField,
            phone: phoneField,
            address: addressField,
            city: cityField
          }
        };
        isEditing = false;
        message = 'Profil berhasil diperbarui';
        messageType = 'success';

        // Refresh page data to sync displayData
        await invalidateAll();

        // Update auth store
        await authStore.checkAuth();
      } else {
        const data = await response.json().catch(() => ({ message: 'Bad request' }));
        message = data.message || 'Gagal memperbarui profil';
        messageType = 'error';
      }
    } catch (error) {
      message = 'Terjadi kesalahan jaringan';
      messageType = 'error';
    }

    isSaving = false;
  }

  function getInitials(name: string | null): string {
    if (!name) return (user.username?.substring(0, 2) || 'U').toUpperCase();
    return name.split(' ').map(word => word[0]).join('').toUpperCase().substring(0, 2);
  }

  // Photo upload functionality
  function openPhotoDialog() {
    showPhotoDialog = true;
    photoMessage = '';
  }

  function closePhotoDialog() {
    showPhotoDialog = false;
    selectedFile = null;
    photoMessage = '';
  }

  function handleFileSelect(e: Event) {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      // Check file type and size
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];
      if (!allowedTypes.includes(file.type)) {
        photoMessage = 'Format file tidak didukung. Gunakan JPG, PNG, WebP, atau SVG.';
        photoMessageType = 'error';
        selectedFile = null;
        return;
      }

      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        photoMessage = 'Ukuran file terlalu besar. Maksimum 5MB.';
        photoMessageType = 'error';
        selectedFile = null;
        return;
      }

      selectedFile = file;
      photoMessage = `File dipilih: ${file.name}. Klik "Upload Foto" untuk menyimpan.`;
      photoMessageType = 'info';
    }
  }

  async function uploadPhoto() {
    if (!selectedFile) {
      photoMessage = 'Silakan pilih file foto terlebih dahulu.';
      photoMessageType = 'error';
      return;
    }

    isUploading = true;
    photoMessage = '';

    try {
      const formData = new FormData();
      formData.append('photo', selectedFile);

      // For multipart/form-data, use relative URL to ensure proper proxy handling
      const response = await fetch('/api/users/profile-photo', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });

      const result = await response.json();

      if (response.ok && result.fileName) {
        photoMessage = 'Foto berhasil diupload!';
        photoMessageType = 'success';

        // Close dialog after successful upload
        setTimeout(() => {
          closePhotoDialog();
        }, 1500);

        // Update local user profile picture
        user = { ...user, userProfile: { ...user.userProfile, profilePicture: result.fileName } };

        // Force avatar image refresh
        imageRefreshKey = Date.now();

        // Update auth store to refresh navbar photo
        authStore.refreshProfilePhoto();

        // Wait a bit for navbar to update, then reload profile data and page
        await new Promise(resolve => setTimeout(resolve, 100));

        await authStore.checkAuth();

        // Reload page to reflect latest server state
        await invalidateAll();
      } else {
        photoMessage = result.message || 'Gagal mengupload foto.';
        photoMessageType = 'error';
      }
    } catch (error) {
      photoMessage = 'Terjadi kesalahan jaringan.';
      photoMessageType = 'error';
    }

    isUploading = false;
  }
</script>

<div class="container mx-auto max-w-2xl px-4 py-8">
  <div class="mb-8">
    <h1 class="text-3xl font-bold text-on-surface mb-2">Profil Pengguna</h1>
    <p class="text-on-surface-variant">Kelola informasi profil Anda</p>
  </div>

  {#if message}
    <div class="mb-6 p-4 rounded-lg border-l-4 bg-surface-container-highest {messageType === 'error' ? 'border-error bg-error-container text-on-error-container' :
      messageType === 'success' ? 'border-tertiary bg-tertiary-container text-on-tertiary-container' :
      'border-primary bg-primary-container text-on-primary-container'}">
      <div class="flex justify-between items-center">
        <p>{message}</p>
        <button onclick={() => message = ''} class="ml-4 text-current hover:opacity-75">×</button>
      </div>
    </div>
  {/if}

  <div class="mb-6">
    <Card variant="elevated">
      <div class="p-6">
      <!-- Avatar Section -->
      <div class="flex flex-col items-center mb-6">
        <div class="relative mb-4">
          {#if user.id}
            <img
              class="w-32 h-32 rounded-full object-cover"
              src="{buildApiUrl(`api/users/profile-photo/${user.id}`)}?t={imageRefreshKey}"
              alt="Profile photo"
              onerror={() => {
                // Hide image and show fallback on error
              }}
            />
          {:else}
            {@const profile = displayData()}
            <div class="w-32 h-32 rounded-full bg-primary container-tone flex items-center justify-center text-primary text-2xl font-bold">
              {getInitials(profile.profileName || profile.username)}
            </div>
          {/if}
          <!-- Edit photo button overlay -->
          <button
            onclick={openPhotoDialog}
            class="absolute -bottom-1 -right-1 bg-primary text-on-primary rounded-full p-2 shadow-lg hover:bg-primary-dim transition-colors"
            title="Edit photo"
          >
            <Icon icon={iconCamera} />
          </button>
        </div>
        {#if !isEditing}
          <Button variant="outlined" onclick={startEditing}>
            Edit Profil
          </Button>
        {/if}
      </div>

      <!-- Profile Information -->
      {#if !isEditing}
        {@const profile = displayData()}
        <!-- View Mode -->
        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-on-surface-variant mb-1">Nama Profil</label>
              <p class="text-on-surface text-base">{profile.profileName || '-'}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-on-surface-variant mb-1">Username</label>
              <p class="text-on-surface text-base">{profile.username || '-'}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-on-surface-variant mb-1">Email</label>
              <p class="text-on-surface text-base">{profile.email || '-'}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-on-surface-variant mb-1">Telepon</label>
              <p class="text-on-surface text-base">{profile.phone || '-'}</p>
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-on-surface-variant mb-1">Alamat</label>
              <p class="text-on-surface text-base">{profile.address || '-'}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-on-surface-variant mb-1">Kota</label>
              <p class="text-on-surface text-base">{profile.city || '-'}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-on-surface-variant mb-1">Role</label>
              <p class="text-on-surface text-base">{profile.roleName}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-on-surface-variant mb-1">ID Pengguna</label>
              <p class="text-on-surface text-base font-mono">{profile.userId}</p>
            </div>
          </div>
        </div>
      {:else}
        <!-- Edit Mode -->
        <form class="space-y-6" onsubmit={saveProfile}>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField
              bind:value={profileNameField}
              label="Nama Profil"
              placeholder="Masukkan nama profil"
              required
            />
            <TextField
              bind:value={usernameField}
              label="Username"
              disabled
              placeholder="Masukkan username"
              required
            />

            <TextField
                bind:value={emailField}
                type="email"
                label="Email"
                placeholder="Masukkan email"
                required
              />
            <TextField
              bind:value={phoneField}
              label="Telepon"
              placeholder="Masukkan nomor telepon"
            />
            <TextField
              bind:value={cityField}
              label="Kota"
              placeholder="Masukkan kota"
            />
            <TextField
                bind:value={addressField}
                label="Alamat"
                placeholder="Masukkan alamat lengkap"
              />
          </div>

          <div class="flex gap-3 pt-4 border-t border-outline-variant">
            <Button
              variant="filled"
              type="submit"
              disabled={isSaving}
            >
              {isSaving ? 'Menyimpan...' : 'Simpan'}
            </Button>
            <Button
              variant="outlined"
              onclick={cancelEditing}
              disabled={isSaving}
            >
              Batal
            </Button>
          </div>
        </form>
      {/if}
    </div>
  </Card>
  </div>

  <!-- Photo Upload Modal -->
  {#if showPhotoDialog}
    <div class="fixed inset-0 bg-surface/70 backdrop-blur flex items-center justify-center z-50 p-4" transition:blur>
      <div class="bg-surface rounded-lg shadow-xl max-w-md w-full max-h-128 overflow-auto" in:fly={{y:20}} out:fly={{y:-20}}>
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold text-on-surface">Upload Foto Profil</h2>
            <button onclick={closePhotoDialog} class="text-on-surface-variant hover:text-on-surface">
              <Icon icon={iconEdit} class="w-6 h-6" />
            </button>
          </div>

          <p class="mb-4 text-on-surface-variant">Pilih foto untuk di-upload sebagai foto profil Anda</p>

          {#if photoMessage}
            <div class="mb-4 p-3 rounded-lg {photoMessageType === 'error' ? 'bg-error-container text-on-error-container border border-error' :
              photoMessageType === 'success' ? 'bg-tertiary-container text-on-tertiary-container border border-tertiary' :
              'bg-primary-container text-on-primary-container border border-primary'}">
              {photoMessage}
            </div>
          {/if}

          <div class="space-y-4">
            <!-- File input -->
            <div>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/svg+xml"
                onchange={handleFileSelect}
                class="block w-full px-3 py-2 border border-outline rounded-lg focus:ring-2 focus:ring-primary focus:border-primary file:mr-4 file:py-2 file:px-4 file:rounded-l-lg file:border-0 file:text-sm file:font-medium file:bg-primary file:text-on-primary hover:file:bg-primary-dim"
                disabled={isUploading}
              />
            </div>

            <!-- Preview selected file -->
            {#if selectedFile}
              <div class="border border-outline rounded-lg p-4">
                <h4 class="font-medium mb-2">Preview:</h4>
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Preview"
                  class="max-w-48 max-h-48 object-cover rounded-lg shadow"
                  onerror={(e) => (e.target as HTMLElement).style.display = 'none'}
                />
                <p class="text-sm text-on-surface-variant mt-2">
                  Nama file: {selectedFile.name}<br>
                  Ukuran: {Math.round(selectedFile.size / 1024)} KB
                </p>
              </div>
            {/if}

            <!-- Action buttons -->
            <div class="flex gap-3 justify-end pt-4 border-t border-outline">
              <Button variant="text" onclick={closePhotoDialog} disabled={isUploading}>
                Batal
              </Button>
              <Button
                variant="filled"
                onclick={uploadPhoto}
                disabled={!selectedFile || isUploading}
              >
                {isUploading ? 'Mengupload...' : 'Upload Foto'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}

  <!-- Account Information -->
  <Card variant="elevated">
    {@const profile = displayData()}
    <div class="p-6">
      <h2 class="text-xl font-semibold text-on-surface mb-4">Informasi Akun</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <span class="font-medium text-on-surface-variant">Status:</span>
          <span class="text-on-surface ml-2">Aktif</span>
        </div>
        <div>
          <span class="font-medium text-on-surface-variant">Role:</span>
          <span class="text-on-surface ml-2">{profile.roleName}</span>
        </div>
        <div class="md:col-span-2">
          <span class="font-medium text-on-surface-variant">Dibuat:</span>
          <span class="text-on-surface ml-2">{new Date(user.createdAt).toLocaleDateString('id-ID')}</span>
        </div>
        <div class="md:col-span-2">
          <span class="font-medium text-on-surface-variant">Diperbarui:</span>
          <span class="text-on-surface ml-2">{new Date(user.updatedAt).toLocaleDateString('id-ID')}</span>
        </div>
      </div>
    </div>
  </Card>
</div>
