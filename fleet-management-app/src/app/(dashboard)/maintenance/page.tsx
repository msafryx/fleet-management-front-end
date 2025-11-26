// Performance optimization: Code splitting with dynamic import
// Component only loads when this route is visited
'use client';

import dynamic from 'next/dynamic';

const MaintenanceDashboard = dynamic(() => 
  import('@/components/MaintenanceDashboard').then(mod => ({ default: mod.MaintenanceDashboard })),
  {
    loading: () => <div className="flex items-center justify-center h-screen">Loading maintenance dashboard...</div>,
  }
);

export default function MaintenancePage() {
  return <MaintenanceDashboard />;
}

