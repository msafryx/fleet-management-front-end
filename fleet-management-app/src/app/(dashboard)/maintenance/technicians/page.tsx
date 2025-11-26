'use client';

import dynamic from 'next/dynamic';

const TechnicianManagement = dynamic(() => 
  import('@/components/TechnicianManagement').then(mod => ({ default: mod.TechnicianManagement })),
  {
    loading: () => <div className="flex items-center justify-center h-screen">Loading technicians...</div>,
  }
);

export default function TechniciansPage() {
  return <TechnicianManagement />;
}

