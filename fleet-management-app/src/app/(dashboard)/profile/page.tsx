'use client';

import { UserProfile } from '@/components/user/UserProfile';
import { useAuth } from '@/contexts/AuthContext';

export default function ProfilePage() {
  const { user, updateUser } = useAuth();

  if (!user) {
    return null;
  }

  return <UserProfile user={user} onUpdateUser={updateUser} />;
}
