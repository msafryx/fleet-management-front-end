// Performance optimization: Code splitting with dynamic import
// Component only loads when this route is visited
'use client';

import dynamic from 'next/dynamic';

const DashboardOverview = dynamic(() => 
  import('@/components/DashboardOverview').then(mod => ({ default: mod.DashboardOverview })),
  {
    loading: () => <div className="flex items-center justify-center h-screen">Loading dashboard...</div>,
  }
);

export default function DashboardPage() {
  return <DashboardOverview />;
}

