import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth } from '@/services/firebase';
import { getUserProfile, setUserProfile } from '@/services/firestore';
import { createHostRequest } from '@/services/firestore';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'host' | 'admin';
  avatar?: string;
  hostApproved?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<User | null>;
  signup: (email: string, password: string, displayName: string, role: User['role']) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('unimap_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<User | null> => {
    setIsLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const fbUser = cred.user;
      const profile = await getUserProfile(fbUser.uid);
      const inferredRole = (email.includes('admin') ? 'admin' : email.includes('host') ? 'host' : 'student') as User['role'];
      const userData: User = {
        id: fbUser.uid,
        name: fbUser.displayName || fbUser.email || 'User',
        email: fbUser.email || email,
        role: profile?.role || inferredRole,
        hostApproved: profile?.hostApproved,
      };
      setUser(userData);
      localStorage.setItem('unimap_user', JSON.stringify(userData));
      setIsLoading(false);
      return userData;
    } catch (e) {
      setIsLoading(false);
      return null;
    }
  };

  const signup = async (email: string, password: string, displayName: string, role: User['role']): Promise<boolean> => {
    setIsLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName });
      }
      const fbUser = cred.user;
      await setUserProfile({ uid: fbUser.uid, email: fbUser.email || email, name: displayName || email, role, hostApproved: role === 'host' ? false : undefined });
      if (role === 'host') {
        try { await createHostRequest(fbUser.uid, displayName || email, fbUser.email || email); } catch {}
      }
      const userData: User = {
        id: fbUser.uid,
        name: displayName || email,
        email: fbUser.email || email,
        role,
        hostApproved: role === 'host' ? false : undefined,
      };
      setUser(userData);
      localStorage.setItem('unimap_user', JSON.stringify(userData));
      setIsLoading(false);
      return true;
    } catch (e) {
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    signOut(auth).finally(() => {
      setUser(null);
      localStorage.removeItem('unimap_user');
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
