
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { supabase } from '../../integrations/supabase/client';

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
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
  user: null,
  session: null,
  isLoading: true,
  error: null,
  isAuthenticated: false,
  isInitialized: false,
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      console.log('Attempting login with Supabase Auth');
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      console.log('Login response:', { data, error });
      
      if (error) {
        return rejectWithValue(error.message);
      }
      
      return {
        user: data.user,
        session: data.session,
      };
    } catch (error) {
      console.error('Login error:', error);
      return rejectWithValue('Network error. Please try again.');
    }
  }
);

export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      console.log('Attempting signup with Supabase Auth');
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl
        }
      });
      
      console.log('Signup response:', { data, error });
      
      if (error) {
        return rejectWithValue(error.message);
      }
      
      return {
        user: data.user,
        session: data.session,
      };
    } catch (error) {
      console.error('Signup error:', error);
      return rejectWithValue('Network error. Please try again.');
    }
  }
);

export const initializeAuth = createAsyncThunk(
  'auth/initialize',
  async (_, { dispatch }) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      // Set up auth state change listener
      supabase.auth.onAuthStateChange((event, session) => {
        console.log('Auth state changed:', event, session);
        if (session) {
          dispatch(setAuthData({
            user: session.user,
            session: session,
          }));
        } else {
          dispatch(clearAuth());
        }
      });
      
      return session;
    } catch (error) {
      console.error('Auth initialization error:', error);
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      supabase.auth.signOut();
      state.user = null;
      state.session = null;
      state.isAuthenticated = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    setAuthData: (state, action) => {
      const { user, session } = action.payload;
      state.user = user ? {
        id: user.id,
        email: user.email,
        firstName: user.user_metadata?.firstName,
        lastName: user.user_metadata?.lastName,
      } : null;
      state.session = session;
      state.isAuthenticated = !!session;
      state.isLoading = false;
      state.isInitialized = true;
    },
    clearAuth: (state) => {
      state.user = null;
      state.session = null;
      state.isAuthenticated = false;
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
          id: user.id,
          email: user.email,
          firstName: user.user_metadata?.firstName,
          lastName: user.user_metadata?.lastName,
        };
        state.session = session;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string || 'Login failed';
        state.isAuthenticated = false;
      })
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const { user, session } = action.payload;
        if (user && session) {
          state.user = {
            id: user.id,
            email: user.email,
            firstName: user.user_metadata?.firstName,
            lastName: user.user_metadata?.lastName,
          };
          state.session = session;
          state.isAuthenticated = true;
        }
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string || 'Signup failed';
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        const session = action.payload;
        if (session) {
          state.user = {
            id: session.user.id,
            email: session.user.email,
            firstName: session.user.user_metadata?.firstName,
            lastName: session.user.user_metadata?.lastName,
          };
          state.session = session;
          state.isAuthenticated = true;
        }
        state.isLoading = false;
        state.isInitialized = true;
      });
  },
});

export const { logout, clearError, setAuthData, clearAuth } = authSlice.actions;
export default authSlice.reducer;
