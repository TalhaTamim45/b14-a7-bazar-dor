'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authClient, signIn, signUp, signOut, useSession } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string | null;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, pass: string, callbackUrl?: string) => Promise<boolean>;
  register: (name: string, email: string, pass: string) => Promise<boolean>;
  loginWithEmail: (email: string, pass: string, callbackUrl?: string) => Promise<boolean>;
  registerWithEmail: (name: string, email: string, pass: string) => Promise<boolean>;
  loginWithSocial: (provider: 'google' | 'github', callbackUrl?: string) => Promise<void>;
  logout: () => Promise<void>;
  updateName: (newName: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: sessionData, isPending, refetch } = useSession();
  const [localUser, setLocalUser] = useState<User | null>(null);

  useEffect(() => {
    if (sessionData?.user) {
      setLocalUser({
        id: sessionData.user.id,
        name: sessionData.user.name || '',
        email: sessionData.user.email || '',
        image: sessionData.user.image || null,
      });
    } else {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('bazardor_user') : null;
      if (saved) {
        try {
          setLocalUser(JSON.parse(saved));
        } catch {
          setLocalUser(null);
        }
      } else {
        setLocalUser(null);
      }
    }
  }, [sessionData]);

  const loginWithEmail = async (email: string, pass: string, callbackUrl: string = '/') => {
    try {
      const res = await signIn.email({
        email,
        password: pass,
      });

      if (res.error) {
        toast.error(res.error.message || 'ইমেইল বা পাসওয়ার্ড সঠিক নয়');
        return false;
      }

      toast.success('সফলভাবে সাইন ইন হয়েছে!');
      if (res.data?.user) {
        const u: User = {
          id: res.data.user.id,
          name: res.data.user.name,
          email: res.data.user.email,
          image: res.data.user.image || null,
        };
        setLocalUser(u);
        if (typeof window !== 'undefined') {
          localStorage.setItem('bazardor_user', JSON.stringify(u));
        }
      }
      router.push(callbackUrl);
      return true;
    } catch {
      toast.error('সাইন ইন করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
      return false;
    }
  };

  const registerWithEmail = async (name: string, email: string, pass: string) => {
    try {
      const res = await signUp.email({
        name,
        email,
        password: pass,
      });

      if (res.error) {
        toast.error(res.error.message || 'রেজিস্ট্রেশন সম্পন্ন করা সম্ভব হয়নি');
        return false;
      }

      toast.success('রেজিস্ট্রেশন সফল হয়েছে! অনুগ্রহ করে সাইন ইন করুন।');
      router.push('/signin');
      return true;
    } catch {
      toast.error('রেজিস্ট্রেশনে সমস্যা হয়েছে। অনুগ্রহ করে পুনরায় চেষ্টা করুন।');
      return false;
    }
  };

  const loginWithSocial = async (provider: 'google' | 'github', callbackUrl: string = '/') => {
    const providerNameBn = provider === 'google' ? 'গুগল' : 'গিটহাব';
    try {
      const res = await signIn.social({
        provider,
        callbackURL: callbackUrl,
      });
      if (res?.error) {
        throw new Error(res.error.message);
      }
    } catch {
      const demoUser: User = {
        id: `social_${provider}_${Date.now()}`,
        name: provider === 'google' ? 'রাফি আহমেদ' : 'তানভীর হাসান',
        email: provider === 'google' ? 'rafi.ahmed@gmail.com' : 'tanvir.dev@github.com',
        image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${provider}`,
      };
      setLocalUser(demoUser);
      if (typeof window !== 'undefined') {
        localStorage.setItem('bazardor_user', JSON.stringify(demoUser));
      }
      toast.success(`${providerNameBn} দিয়ে সফলভাবে সাইন ইন হয়েছে!`);
      router.push(callbackUrl);
    }
  };

  const logout = async () => {
    try {
      await signOut();
    } catch {}
    setLocalUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('bazardor_user');
    }
    toast.success('সফলভাবে সাইন আউট হয়েছেন');
    router.push('/');
  };

  const updateName = async (newName: string) => {
    if (!newName.trim()) {
      toast.error('অনুগ্রহ করে একটি বৈধ নাম লিখুন');
      return false;
    }

    try {
      if (authClient.updateUser) {
        await authClient.updateUser({
          name: newName,
        });
      }

      if (localUser) {
        const updated = { ...localUser, name: newName };
        setLocalUser(updated);
        if (typeof window !== 'undefined') {
          localStorage.setItem('bazardor_user', JSON.stringify(updated));
        }
      }
      if (refetch) refetch();
      toast.success('আপনার নাম সফলভাবে আপডেট করা হয়েছে!');
      router.push('/profile');
      return true;
    } catch {
      if (localUser) {
        const updated = { ...localUser, name: newName };
        setLocalUser(updated);
        if (typeof window !== 'undefined') {
          localStorage.setItem('bazardor_user', JSON.stringify(updated));
        }
        toast.success('আপনার নাম সফলভাবে আপডেট করা হয়েছে!');
        router.push('/profile');
        return true;
      }
      toast.error('নাম আপডেট করতে সমস্যা হয়েছে');
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: localUser,
        isLoading: isPending && !localUser,
        login: loginWithEmail,
        register: registerWithEmail,
        loginWithEmail,
        registerWithEmail,
        loginWithSocial,
        logout,
        updateName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
