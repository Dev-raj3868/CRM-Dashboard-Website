
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

export interface AuthState {
  user: User | null;
  session: any;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    user_metadata?: {
      firstName?: string;
      lastName?: string;
      phone?: string;
    };
  };
  session: any;
}
