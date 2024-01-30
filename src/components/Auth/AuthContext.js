// AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from 'firebase/auth'; // Correct import
import 'firebase/auth'; // Keep this import for other components
import 'firebase/firestore';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const provider = new auth.GoogleAuthProvider();
    await auth().signInWithPopup(provider);
  };

  const signOut = async () => {
    await auth().signOut();
  };

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
