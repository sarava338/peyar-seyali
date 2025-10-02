import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { clearUser, setUser } from "../store/slices/authSlice";

interface AuthProviderProps {
  children: React.ReactNode | undefined;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            name: user.displayName ?? "",
            email: user.email ?? "",
            imageUrl: user.photoURL ?? "",
            isAdmin: (await user.getIdTokenResult()).claims.admin === true,
          })
        );
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return children;
}
