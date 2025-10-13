// Performance optimization: Code splitting with dynamic import
// Component only loads when this route is visited
'use client';

import dynamic from 'next/dynamic';

const FuelManagement = dynamic(() => 
  import('@/components/FuelManagement').then(mod => ({ default: mod.FuelManagement })),
  {
    loading: () => <div className="flex items-center justify-center h-screen">Loading fuel data...</div>,
  }
);

export default function FuelPage() {
  return <FuelManagement />;
}

