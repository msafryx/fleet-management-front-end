// Performance optimization: Code splitting with dynamic import
// Heavy chart components only load when this route is visited
'use client';

import dynamic from 'next/dynamic';

const Analytics = dynamic(() => 
  import('@/components/Analytics').then(mod => ({ default: mod.Analytics })),
  {
    loading: () => <div className="flex items-center justify-center h-screen">Loading analytics...</div>,
  }
);

export default function AnalyticsPage() {
  return <Analytics />;
}

