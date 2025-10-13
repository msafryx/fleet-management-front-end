// Performance optimization: Code splitting with dynamic import
// Component only loads when this route is visited
'use client';

import dynamic from 'next/dynamic';

const VehicleManagement = dynamic(() => 
  import('@/components/VehicleManagement').then(mod => ({ default: mod.VehicleManagement })),
  {
    loading: () => <div className="flex items-center justify-center h-screen">Loading vehicles...</div>,
  }
);

export default function VehiclesPage() {
  return <VehicleManagement />;
}

