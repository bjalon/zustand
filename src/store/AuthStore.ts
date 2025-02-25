import { StateCreator } from "zustand";
import AuthService from "../services/AuthService";
import { create } from "zustand/index";
import { devtools } from "zustand/middleware";

interface AuthStoreData {
  login?: string;
  error?: string;
  isLogged: boolean;
}

interface AuthStoreActions {
  connect: (login: string, password: string) => void;

  disconnect: () => void;
}

const authStore: StateCreator<AuthStoreData & AuthStoreActions, [["zustand/devtools", never]]> = (
  set,
  get,
) => ({
  login: undefined,
  isLogged: false,
  error: undefined,
  connect: (login: string, password: string) => {
    try {
      AuthService.login(login, password);
      set({ login: login, isLogged: true });
    } catch (e: any) {
      set({ login: undefined, isLogged: true, error: e.message });
    }
  },
  disconnect: () => {
    set({ login: undefined, isLogged: false });
  },
});

const useAuthStore: StateCreator<AuthStoreData & AuthStoreActions> = create<
  AuthStoreData & AuthStoreActions
>()(devtools(authStore));

export default useAuthStore;
