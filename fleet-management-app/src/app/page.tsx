import { redirect } from 'next/navigation';

export default function RootPage() {
  // Redirect to dashboard by default
  // In production, check authentication status and redirect accordingly
  redirect('/dashboard');
}
