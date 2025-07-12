
import { AuthState } from '../types/auth';

export const initialAuthState: AuthState = {
  user: {
    id: 'guest-user',
    email: 'guest@example.com',
    firstName: 'Guest',
    lastName: 'User',
  },
  session: { user: { id: 'guest-user' } },
  isLoading: false,
  error: null,
  isAuthenticated: true, // Always authenticated for guest access
  isInitialized: true,
};

export const GUEST_USER = {
  id: 'guest-user',
  email: 'guest@example.com',
  firstName: 'Guest',
  lastName: 'User',
};

export const GUEST_SESSION = { user: { id: 'guest-user' } };
