import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../firebase/config';
import { AppUser } from '../types';
import { syncUserProfile } from '../services/firestoreService';

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  isAdmin: boolean;
  loginWithGoogle: () => Promise<void>;
  loginAsAdmin: (username: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_STORAGE_KEY = 'al_arabiya_admin_session';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Check stored admin session or Firebase auth
  useEffect(() => {
    // 1. Check local admin session
    const savedAdmin = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (savedAdmin) {
      try {
        const parsed = JSON.parse(savedAdmin) as AppUser;
        setUser(parsed);
        setLoading(false);
        return;
      } catch (e) {
        console.error('Failed to parse admin session', e);
        localStorage.removeItem(ADMIN_STORAGE_KEY);
      }
    }

    // 2. Listen to Firebase Auth state
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        // If logged in via Google
        const appUser: AppUser = {
          uid: fbUser.uid,
          displayName: fbUser.displayName || fbUser.email?.split('@')[0] || 'Siswa MTs',
          email: fbUser.email || undefined,
          role: 'student',
          avatar: fbUser.photoURL || undefined,
          createdAt: new Date().toISOString(),
        };
        setUser(appUser);
        // Sync profile to firestore
        syncUserProfile(appUser).catch((err) => console.log('Sync user info:', err));
      } else {
        // Only set to null if not admin logged in
        if (!localStorage.getItem(ADMIN_STORAGE_KEY)) {
          setUser(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      const res = await signInWithPopup(auth, googleProvider);
      const fbUser = res.user;
      const appUser: AppUser = {
        uid: fbUser.uid,
        displayName: fbUser.displayName || 'Siswa MTs',
        email: fbUser.email || undefined,
        role: 'student',
        avatar: fbUser.photoURL || undefined,
        createdAt: new Date().toISOString(),
      };
      setUser(appUser);
      localStorage.removeItem(ADMIN_STORAGE_KEY);
      await syncUserProfile(appUser);
    } catch (error) {
      console.error('Google Sign In error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginAsAdmin = async (username: string, pass: string): Promise<{ success: boolean; message?: string }> => {
    // Strict match as requested by user: mulmedlapon & pakferi123
    if (username.trim() === 'mulmedlapon' && pass.trim() === 'pakferi123') {
      const adminUser: AppUser = {
        uid: 'admin_mulmedlapon',
        displayName: 'Pak Feri (Guru & Admin)',
        email: 'mulmedlapon@madrasah.sch.id',
        role: 'admin',
        avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=pakferi',
        createdAt: new Date().toISOString(),
      };
      setUser(adminUser);
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(adminUser));
      // Sync to Firestore
      try {
        await syncUserProfile(adminUser);
      } catch (e) {
        console.log('Admin sync note:', e);
      }
      return { success: true };
    } else {
      return {
        success: false,
        message: 'Username atau password admin keliru. Silakan periksa kembali.',
      };
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem(ADMIN_STORAGE_KEY);
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      setUser(null);
    }
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAdmin,
        loginWithGoogle,
        loginAsAdmin,
        logout,
      }}
    >
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
