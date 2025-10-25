export interface ClaimUser {
    id: string;
    email: string | null;
    roleId: number;
    username: string | null;
    profileName: string | null;
}

export interface Role {
    id: number;
    name?: string | null;
    level: number;
}

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    phone?: string | null;
    address?: string | null;
    city?: string | null;
    profilePicture?: string | null;
}

export interface UserData {
    id: string;
    username: string;
    password: string;
    passwordSalt: string;
    roleId: number;
    role: Role;
    userProfileId: string;
    userProfile: UserProfile;
    createdAt: string;
    updatedAt: string;
    isActivated: boolean;
}

export interface CreateUserRequest {
    name: string;
    email: string;
    username: string;
    password: string;
}

export interface LoginRequest {
    username: string | null;
    password: string | null;
}

export interface LoginResponse {
    message: string;
    isAuth: boolean;
}

export interface PhotoUploadResponse {
    fileName: string;
    message: string;
}

export interface ServiceResponse {
    success: boolean;
    message: string;
}

export interface RegisterRequest {
    username?: string | null;
    password?: string | null;
    name?: string | null;
    email?: string | null;
}

export interface ChangePasswordRequest {
    oldPassword: string;
    newPassword: string;
}
