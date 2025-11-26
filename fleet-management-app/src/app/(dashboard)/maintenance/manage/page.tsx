'use client';

import dynamic from 'next/dynamic';

const MaintenanceManagement = dynamic(() => 
  import('@/components/MaintenanceManagement').then(mod => ({ default: mod.MaintenanceManagement })),
  {
    loading: () => <div className="flex items-center justify-center h-screen">Loading maintenance management...</div>,
  }
);

export default function MaintenanceManagementPage() {
  return <MaintenanceManagement />;
}

