'use client';

import dynamic from 'next/dynamic';

const MaintenanceScheduler = dynamic(() => 
  import('@/components/MaintenanceScheduler').then(mod => ({ default: mod.MaintenanceScheduler })),
  {
    loading: () => <div className="flex items-center justify-center h-screen">Loading scheduler...</div>,
  }
);

export default function MaintenanceSchedulerPage() {
  return <MaintenanceScheduler />;
}

