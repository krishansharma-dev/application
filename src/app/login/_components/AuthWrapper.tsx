'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Session } from '@supabase/supabase-js';
import LoginPage from '@/app/login/page';
import { createClient } from '@/lib/client';

// Create Supabase client
const supabase = createClient();

interface AuthWrapperProps {
  children: React.ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);

      if (session?.user) {
        router.push('/application'); // ✅ Redirect if already logged in
      }
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setLoading(false);

      if (session?.user && event === 'SIGNED_IN') {
        // ✅ Redirect after sign in
        router.push('/application');

        // Create user profile if it doesn't exist
        const { error } = await supabase.from('users').upsert([
          {
            id: session.user.id,
            email: session.user.email!,
            name: session.user.user_metadata?.name || session.user.email!,
          },
        ]);

        if (error) {
          console.error('Error creating user profile:', error);
        }
      }

      if (event === 'SIGNED_OUT') {
        setSession(null);
        router.push('/login'); // ✅ Redirect after logout
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return <LoginPage />;
  }

  return <>{children}</>;
}