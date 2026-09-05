import { createStore } from './create-store';

export const USER_STORAGE_KEY = 'careercompass.user';

export interface UserProfile {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  experience: string;
  skills: string[];
  interests: string[];
  careerPath: string;
  /** The user's primary career goal, chosen during onboarding. */
  goal: string;
  /** URL or data URI of the user's profile picture. */
  avatarUri?: string;
}

const initialState: UserProfile = {
  name: 'Alex Johnson',
  title: 'Frontend Engineer',
  bio: 'Building thoughtful products with TypeScript and React.',
  email: 'alex@example.com',
  phone: '+1 555 012 3456',
  location: 'San Francisco, CA',
  experience: '3 years',
  skills: ['TypeScript', 'React', 'System design'],
  interests: ['Technology', 'Design'],
  careerPath: 'Frontend Engineer',
  goal: 'Grow in my role',
};

const store = createStore<UserProfile>(initialState, { persist: USER_STORAGE_KEY });

export const userStore = {
  ...store,
  update(patch: Partial<UserProfile>) {
    store.setState(patch);
  },
  setSkills(skills: string[]) {
    store.setState({ skills });
  },
  setAvatar(avatarUri?: string) {
    store.setState({ avatarUri });
  },
  /** Clear the profile back to defaults (logout). */
  reset() {
    store.setState(initialState);
  },
};

export function useUser(): UserProfile {
  return store.useStore();
}