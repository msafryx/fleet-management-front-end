'use client';

import dynamic from 'next/dynamic';

const MaintenanceAnalytics = dynamic(() => 
  import('@/components/MaintenanceAnalytics').then(mod => ({ default: mod.MaintenanceAnalytics })),
  {
    loading: () => <div className="flex items-center justify-center h-screen">Loading analytics...</div>,
  }
);

export default function MaintenanceAnalyticsPage() {
  return <MaintenanceAnalytics />;
}

