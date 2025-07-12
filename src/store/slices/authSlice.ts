import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../types/auth';
import { initialAuthState, GUEST_USER, GUEST_SESSION } from '../constants/authConstants';
import { loginUser, signupUser, logoutUser, initializeAuth } from '../thunks/authThunks';

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    logout: (state) => {
      // Reset to guest user instead of logging out
      state.user = { ...GUEST_USER };
      state.session = { ...GUEST_SESSION };
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
      } : { ...GUEST_USER };
      state.session = session || { ...GUEST_SESSION };
      state.isAuthenticated = true;
      state.isLoading = false;
      state.isInitialized = true;
    },
    setGuestAuth: (state) => {
      state.user = { ...GUEST_USER };
      state.session = { ...GUEST_SESSION };
      state.isAuthenticated = true;
      state.isLoading = false;
      state.isInitialized = true;
    },
    clearAuth: (state) => {
      // Don't clear auth, set guest auth instead
      state.user = { ...GUEST_USER };
      state.session = { ...GUEST_SESSION };
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
        state.session = session || { ...GUEST_SESSION };
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
        state.session = session || { ...GUEST_SESSION };
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
        state.user = { ...GUEST_USER };
        state.session = { ...GUEST_SESSION };
        state.isAuthenticated = true;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.user = { ...GUEST_USER };
        state.session = { ...GUEST_SESSION };
        state.isAuthenticated = true;
        state.isLoading = false;
        state.isInitialized = true;
      });
  },
});

export const { logout, clearError, setAuthData, setGuestAuth, clearAuth } = authSlice.actions;

// Export the thunks for use in components
export { loginUser, signupUser, logoutUser, initializeAuth };

export default authSlice.reducer;
