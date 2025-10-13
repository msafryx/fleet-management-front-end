// Performance optimization: Code splitting with dynamic import
// Component only loads when this route is visited
'use client';

import dynamic from 'next/dynamic';

const Reports = dynamic(() => 
  import('@/components/Reports').then(mod => ({ default: mod.Reports })),
  {
    loading: () => <div className="flex items-center justify-center h-screen">Loading reports...</div>,
  }
);

export default function ReportsPage() {
  return <Reports />;
}

