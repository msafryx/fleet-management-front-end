// Performance optimization: Code splitting with dynamic import
// Component only loads when this route is visited
'use client';

import dynamic from 'next/dynamic';

const MaintenanceManagement = dynamic(() => 
  import('@/components/MaintenanceManagement').then(mod => ({ default: mod.MaintenanceManagement })),
  {
    loading: () => <div className="flex items-center justify-center h-screen">Loading maintenance data...</div>,
  }
);

export default function MaintenancePage() {
  return <MaintenanceManagement />;
}

