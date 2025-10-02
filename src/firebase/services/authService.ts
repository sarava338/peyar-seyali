import {
  getRedirectResult,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  type Auth,
  type AuthProvider,
  type Unsubscribe,
} from "firebase/auth";

import { auth, googleAuthProvider } from "../firebase";
import type { IUser } from "../../types/types";

class AuthService {
  private auth;
  private authProvider;

  constructor(auth: Auth, authProvider: AuthProvider) {
    this.auth = auth;
    this.authProvider = authProvider;
  }

  async loginWithRedirect(): Promise<void> {
    try {
      await signInWithRedirect(this.auth, this.authProvider);
    } catch (error) {
      console.error("Google login failed:", error);
      throw error;
    }
  }

  async loginWithPopUp() {
    try {
      await signInWithPopup(this.auth, this.authProvider);
    } catch (error) {
      console.error("Google login failed:", error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  }

  async handleRedirectResult(): Promise<IUser | null> {
    try {
      const result = await getRedirectResult(this.auth);

      console.log("Redirect Result:", result);

      if (!result || !result.user) return null;

      const user = result.user;
      const tokenResult = await user.getIdTokenResult();

      return {
        uid: user.uid ?? "",
        name: user.displayName ?? "",
        email: user.email ?? "",
        image: user.photoURL ?? "",
        isAdmin: tokenResult.claims.admin === true,
      };
    } catch (error) {
      console.error("Handling redirect result failed:", error);
      throw error;
    }
  }

  handleAuthStateChange(callback: (user: IUser | null) => void): Unsubscribe {
    return onAuthStateChanged(this.auth, async (user) => {
      console.log("Auth State Changed:", user);

      if (user) {
        const tokenResult = await user.getIdTokenResult();
        callback({
          uid: user.uid ?? "",
          name: user.displayName ?? "",
          email: user.email ?? "",
          image: user.photoURL ?? "",
          isAdmin: tokenResult.claims.admin === true,
        });
      } else {
        callback(null);
      }
    });
  }
}

export const googleAuthService = new AuthService(auth, googleAuthProvider);
