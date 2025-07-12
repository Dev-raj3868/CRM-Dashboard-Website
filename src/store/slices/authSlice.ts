
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { supabase } from '../../integrations/supabase/client';

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

interface AuthState {
  user: User | null;
  session: any;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
}

const initialState: AuthState = {
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

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    // Skip actual authentication, return guest user
    return {
      user: {
        id: 'guest-user',
        email: email || 'guest@example.com',
        user_metadata: {
          firstName: 'Guest',
          lastName: 'User',
        }
      },
      session: { user: { id: 'guest-user' } },
    };
  }
);

export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async ({ 
    email, 
    password, 
    firstName, 
    lastName, 
    phone 
  }: { 
    email: string; 
    password: string; 
    firstName?: string; 
    lastName?: string; 
    phone?: string; 
  }, { rejectWithValue }) => {
    // Skip actual signup, return guest user
    return {
      user: {
        id: 'guest-user',
        email: email || 'guest@example.com',
        user_metadata: {
          firstName: firstName || 'Guest',
          lastName: lastName || 'User',
          phone: phone || '',
        }
      },
      session: { user: { id: 'guest-user' } },
    };
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    // Don't actually log out, just refresh the guest state
    dispatch(setGuestAuth());
  }
);

export const initializeAuth = createAsyncThunk(
  'auth/initialize',
  async (_, { dispatch }) => {
    // Always initialize with guest user
    dispatch(setGuestAuth());
    return { user: { id: 'guest-user' } };
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      // Reset to guest user instead of logging out
      state.user = {
        id: 'guest-user',
        email: 'guest@example.com',
        firstName: 'Guest',
        lastName: 'User',
      };
      state.session = { user: { id: 'guest-user' } };
      state.isAuthenticated = true;
    },
    clearError: (state) => {
      state.error = null;
    },
    setAuthData: (state, action) => {
      const { user, session } = action.payload;
      state.user = user ? {
        id: user.id || 'guest-user',
        email: user.email || 'guest@example.com',
        firstName: user.user_metadata?.firstName || 'Guest',
        lastName: user.user_metadata?.lastName || 'User',
        phone: user.user_metadata?.phone || '',
      } : {
        id: 'guest-user',
        email: 'guest@example.com',
        firstName: 'Guest',
        lastName: 'User',
      };
      state.session = session || { user: { id: 'guest-user' } };
      state.isAuthenticated = true;
      state.isLoading = false;
      state.isInitialized = true;
    },
    setGuestAuth: (state) => {
      state.user = {
        id: 'guest-user',
        email: 'guest@example.com',
        firstName: 'Guest',
        lastName: 'User',
      };
      state.session = { user: { id: 'guest-user' } };
      state.isAuthenticated = true;
      state.isLoading = false;
      state.isInitialized = true;
    },
    clearAuth: (state) => {
      // Don't clear auth, set guest auth instead
      state.user = {
        id: 'guest-user',
        email: 'guest@example.com',
        firstName: 'Guest',
        lastName: 'User',
      };
      state.session = { user: { id: 'guest-user' } };
      state.isAuthenticated = true;
      state.isLoading = false;
      state.isInitialized = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const { user, session } = action.payload;
        state.user = {
          id: user.id || 'guest-user',
          email: user.email || 'guest@example.com',
          firstName: user.user_metadata?.firstName || 'Guest',
          lastName: user.user_metadata?.lastName || 'User',
          phone: user.user_metadata?.phone || '',
        };
        state.session = session || { user: { id: 'guest-user' } };
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string || 'Login failed';
        // Still set as authenticated for guest access
        state.isAuthenticated = true;
      })
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const { user, session } = action.payload;
        state.user = {
          id: user.id || 'guest-user',
          email: user.email || 'guest@example.com',
          firstName: user.user_metadata?.firstName || 'Guest',
          lastName: user.user_metadata?.lastName || 'User',
          phone: user.user_metadata?.phone || '',
        };
        state.session = session || { user: { id: 'guest-user' } };
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string || 'Signup failed';
        // Still set as authenticated for guest access
        state.isAuthenticated = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        // Reset to guest user instead of clearing auth
        state.user = {
          id: 'guest-user',
          email: 'guest@example.com',
          firstName: 'Guest',
          lastName: 'User',
        };
        state.session = { user: { id: 'guest-user' } };
        state.isAuthenticated = true;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.user = {
          id: 'guest-user',
          email: 'guest@example.com',
          firstName: 'Guest',
          lastName: 'User',
        };
        state.session = { user: { id: 'guest-user' } };
        state.isAuthenticated = true;
        state.isLoading = false;
        state.isInitialized = true;
      });
  },
});

export const { logout, clearError, setAuthData, setGuestAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
