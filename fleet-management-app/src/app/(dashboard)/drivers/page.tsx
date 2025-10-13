// Performance optimization: Code splitting with dynamic import
// Component only loads when this route is visited
'use client';

import dynamic from 'next/dynamic';

const DriverManagement = dynamic(() => 
  import('@/components/DriverManagement').then(mod => ({ default: mod.DriverManagement })),
  {
    loading: () => <div className="flex items-center justify-center h-screen">Loading drivers...</div>,
  }
);

export default function DriversPage() {
  return <DriverManagement />;
}

