'use client';

import dynamic from 'next/dynamic';

const RecurringMaintenance = dynamic(() => 
  import('@/components/RecurringMaintenance').then(mod => ({ default: mod.RecurringMaintenance })),
  {
    loading: () => <div className="flex items-center justify-center h-screen">Loading recurring schedules...</div>,
  }
);

export default function RecurringMaintenancePage() {
  return <RecurringMaintenance />;
}

