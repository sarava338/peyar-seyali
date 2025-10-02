import { useCallback, useEffect } from "react";
import { type TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import type { RootState, AppDispatch } from "./index";
import { clearUser, setUser } from "./slices/authSlice";
import { googleAuthService } from "../firebase/services/authService";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useAuthActions() {
  const dispatch = useDispatch();

  // Login
  const login = useCallback(() => {
    googleAuthService.loginWithPopUp();
  }, []);

  // Logout
  const logout = useCallback(async () => {
    await googleAuthService.logout();
    dispatch(clearUser());
  }, [dispatch]);

  useEffect(() => {
    // Handle the first redirect login result
    const initAuth = async () => {
      const redirectUser = await googleAuthService.handleRedirectResult();
      if (redirectUser) dispatch(setUser(redirectUser));
    };

    initAuth();

    // Always subscribe to auth state
    const unsubscribe = googleAuthService.handleAuthStateChange((user) => {
      if (user) dispatch(setUser(user));
      else dispatch(clearUser());
    });

    return unsubscribe;
  }, [dispatch]);

  return { login, logout };
}
