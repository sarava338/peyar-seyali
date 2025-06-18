import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";

import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

import { clearUser, setUser } from "./userSlice";

import type { RootState, AppDispatch } from "./index";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useAuthActions() {
  const dispatch = useDispatch();

  const login = async (email: string, password: string) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      dispatch(
        setUser({
          uid: res.user.uid,
          email: res.user.email as string,
          name: res.user.displayName as string,
          imageUrl: res.user.photoURL as string,
          isAdmin: (await res.user.getIdTokenResult()).claims.admin === true,
        })
      );
    } catch (err) {
      console.error("Login failed:", err);
      throw err; // Let the caller handle UI feedback
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return { login, logout };
}
