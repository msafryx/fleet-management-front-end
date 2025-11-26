'use client';

import dynamic from 'next/dynamic';

const MaintenanceReports = dynamic(() => 
  import('@/components/MaintenanceReports').then(mod => ({ default: mod.MaintenanceReports })),
  {
    loading: () => <div className="flex items-center justify-center h-screen">Loading reports...</div>,
  }
);

export default function MaintenanceReportsPage() {
  return <MaintenanceReports />;
}

