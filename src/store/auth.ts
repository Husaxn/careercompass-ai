import { createStore } from './create-store';
import { supabase } from '@/lib/supabase';
import { removePersistedKey } from './create-store';

export type AuthState = {
  /** Whether the user has an authenticated session. */
  isAuthenticated: boolean;
  /** Whether the user has completed the onboarding flow. */
  isOnboarded: boolean;
  /** Whether this is the first launch (drives the Landing carousel). */
  isFirstLaunch: boolean;
  /** The current user's Supabase session (null if not signed in). */
  session: any | null;
  /** The current user object from Supabase. */
  user: any | null;
  /** Loading state for auth operations. */
  isLoading: boolean;
  /** Email address awaiting OTP confirmation (set on signUp, cleared on verifyOtp). */
  pendingEmail: string | null;
};

export const AUTH_STORAGE_KEY = 'careercompass.auth';

const initialState: AuthState = {
  isAuthenticated: false,
  isOnboarded: false,
  isFirstLaunch: true,
  session: null,
  user: null,
  isLoading: false,
  pendingEmail: null,
};

/**
 * Auth store persisted to storage so a returning, already-onboarded user is
 * routed straight to Home instead of back through Landing/onboarding. Driven
 * by the shared `useSyncExternalStore` pattern with hydration on startup.
 */
const store = createStore<AuthState>(initialState, { persist: AUTH_STORAGE_KEY });

/** Subscribe to auth state changes from Supabase. */
let authListener: { data: { subscription: any } } | null = null;

function setupAuthListener() {
  if (authListener) return;

  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    store.setState({
      session,
      user: session?.user ?? null,
      isAuthenticated: !!session,
    });
  });
  authListener = data;
}

export const authStore = {
  ...store,
  /** Loading state for auth operations. */
  get isLoading() {
    return store.getSnapshot().isLoading;
  },

  /** Initialize the auth listener - call once on app startup. */
  init() {
    setupAuthListener();
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        store.setState({
          session,
          user: session.user,
          isAuthenticated: true,
        });
      }
    });
  },

  /** Sign in with email and password. */
  async signInWithPassword(email: string, password: string) {
    store.setState({ isLoading: true });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    } finally {
      store.setState({ isLoading: false });
    }
  },

  /** Sign up with email, password, and optional metadata. */
  async signUp(email: string, password: string, metadata?: Record<string, any>) {
    store.setState({ isLoading: true });
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      });
      if (error) throw error;
      // Track this email as pending OTP confirmation, since there is no
      // session/user yet for an unconfirmed account.
      store.setState({ pendingEmail: email });
      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: error.message };
    } finally {
      store.setState({ isLoading: false });
    }
  },

  /** Verify the 6-digit OTP code sent to the pending email address. */
  async verifyOtp(token: string) {
    const email = store.getSnapshot().pendingEmail;
    if (!email) {
      return { success: false, error: 'No pending email found. Please sign up again.' };
    }
    store.setState({ isLoading: true });
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'signup',
      });
      if (error) throw error;
      store.setState({ pendingEmail: null });
      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: error.message };
    } finally {
      store.setState({ isLoading: false });
    }
  },

  /** Sign out the current user. */
  async signOut() {
    store.setState({ isLoading: true });
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      store.setState({
        isAuthenticated: false,
        isOnboarded: false,
        session: null,
        user: null,
      });
      await removePersistedKey(AUTH_STORAGE_KEY);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    } finally {
      store.setState({ isLoading: false });
    }
  },

  /** Reset password - sends recovery email. */
  async resetPassword(email: string) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /** Resend email verification (OTP code) to the pending email address. */
  async resendEmailVerification() {
    const email = store.getSnapshot().pendingEmail;
    if (!email) {
      return { success: false, error: 'No pending email found. Please sign up again.' };
    }
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
      });
      if (error) throw error;
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /** Update password (when user is logged in). */
  async updatePassword(password: string) {
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  /** Complete onboarding flow. */
  completeOnboarding() {
    store.setState({ isOnboarded: true });
  },

  /** Finish first launch. */
  finishLaunch() {
    store.setState({ isFirstLaunch: false });
  },
};

/** Subscribe to auth state. Returns the current snapshot on each change. */
export function useAuth(): AuthState {
  return store.useStore();
}