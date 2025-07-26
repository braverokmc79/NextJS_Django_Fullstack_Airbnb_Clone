import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  userId: string | null;
  isLoggedIn: boolean;
  setUserId: (id: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      userId: null,
      isLoggedIn: false,
      setUserId: (id) =>
        set(() => ({
          userId: id,
          isLoggedIn: !!id,
        })),
      logout: () =>
        set(() => ({
          userId: null,
          isLoggedIn: false,
        })),
    }),
    {
      name: 'auth-storage', // localStorage에 저장될 키 이름
    }
  )
);
