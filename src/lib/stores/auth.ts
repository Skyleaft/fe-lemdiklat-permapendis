import { writable } from 'svelte/store';
import type { ClaimUser } from '$lib/types';
import { buildApiUrl } from '$lib/utils/api';

export interface AuthState {
    user: ClaimUser | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    profilePhotoRefreshKey: number;
}

const initialState: AuthState = {
    user: null,
    isLoading: false,
    isAuthenticated: false,
    profilePhotoRefreshKey: 0,
};

function createAuthStore() {
    const { subscribe, set, update } = writable<AuthState>(initialState);

    return {
        subscribe,
        set,
        update,

        async login(username: string, password: string): Promise<{ success: boolean; message: string }> {
            update(state => ({ ...state, isLoading: true }));

            try {
                const response = await fetch(buildApiUrl('api/auth/login'), {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });

                const data = await response.json();

                if (response.ok && data.isAuth) {
                    // Set cookie includes user's session, now fetch user data
                    const userResponse = await fetch(buildApiUrl('api/auth/me'), {
                        method: 'GET',
                        credentials: 'include' // Include cookies
                    });

                    if (userResponse.ok) {
                        const user: ClaimUser = await userResponse.json();
                        update(state => ({ ...state, user, isLoading: false, isAuthenticated: true }));
                        return { success: true, message: 'Login berhasil' };
                    } else {
                        update(state => ({ ...state, user: null, isLoading: false, isAuthenticated: false }));
                        return { success: false, message: 'Gagal mengambil data pengguna' };
                    }
                } else {
                    update(state => ({ ...state, user: null, isLoading: false, isAuthenticated: false }));
                    return { success: false, message: data.message || 'Username atau password salah' };
                }
            } catch {
                update(state => ({ ...state, user: null, isLoading: false, isAuthenticated: false }));
                return { success: false, message: 'Username atau password salah' };
            }
        },

        async logout(): Promise<{ success: boolean; message: string }> {
            try {
                const response = await fetch(buildApiUrl('api/auth/logout'), {
                    method: 'POST',
                    credentials: 'include'
                });

                const data = await response.json();

                if (response.ok) {
                    set(initialState);
                    return { success: true, message: 'Logout berhasil' };
                } else {
                    return { success: false, message: data.message || 'Gagal logout' };
                }
            } catch {
                set(initialState);
                return { success: false, message: 'Terjadi kesalahan jaringan, tetap logout' };
            }
        },

        async checkAuth(): Promise<boolean> {
            try {
                const response = await fetch(buildApiUrl('api/auth/me'), {
                    method: 'GET',
                    credentials: 'include'
                });

                if (response.ok) {
                    const user: ClaimUser = await response.json();
                    update(state => ({ ...state, user, isLoading: false, isAuthenticated: true }));
                    return true;
                } else {
                    update(state => ({ ...state, user: null, isLoading: false, isAuthenticated: false }));
                    return false;
                }
            } catch {
                update(state => ({ ...state, user: null, isLoading: false, isAuthenticated: false }));
                return false;
            }
        },

        setLoading(loading: boolean) {
            update(state => ({ ...state, isLoading: loading }));
        },

        refreshProfilePhoto() {
            update(state => ({ ...state, profilePhotoRefreshKey: state.profilePhotoRefreshKey + 1 }));
        }
    };
}

export const authStore = createAuthStore();
