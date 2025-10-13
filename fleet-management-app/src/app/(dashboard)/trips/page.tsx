// Performance optimization: Code splitting with dynamic import
// Component only loads when this route is visited
'use client';

import dynamic from 'next/dynamic';

const TripManagement = dynamic(() => 
  import('@/components/TripManagement').then(mod => ({ default: mod.TripManagement })),
  {
    loading: () => <div className="flex items-center justify-center h-screen">Loading trips...</div>,
  }
);

export default function TripsPage() {
  return <TripManagement />;
}

