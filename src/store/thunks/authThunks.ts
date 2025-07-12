
import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginCredentials, SignupCredentials, AuthResponse } from '../types/auth';
import { setGuestAuth } from '../slices/authSlice';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }: LoginCredentials, { rejectWithValue }) => {
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
    } as AuthResponse;
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
  }: SignupCredentials, { rejectWithValue }) => {
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
    } as AuthResponse;
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async () => {
    // Return a signal that logout was successful
    return { redirectToLogin: true };
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
