import { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut, deleteUser } from 'firebase/auth';
import { auth } from "../firebaseConfig"; // Import the auth instance directly

export const AuthContext = createContext({
  user: null,
  token: null,
  isAuthenticated: false,
  logout: () => {},
  deleteAccount: () => {},
  // Remove setUser and setToken since they are not used directly in the context
});

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const idToken = await currentUser.getIdToken();
        setUser(currentUser);
        setToken(idToken);
      } else {
        setUser(null);
        setToken(null);
      }
    });

    return () => unsubscribe();
  }, []);

  function logout() {
    signOut(auth); // Use the imported auth instance
  }

  async function deleteAccount() {
    if (user) {
      await deleteUser(user);
    }
  }

  const value = {
    user,
    token,
    isAuthenticated: !!user,
    logout,
    deleteAccount,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
