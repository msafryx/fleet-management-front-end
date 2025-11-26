'use client';

import dynamic from 'next/dynamic';

const PartsInventory = dynamic(() => 
  import('@/components/PartsInventory').then(mod => ({ default: mod.PartsInventory })),
  {
    loading: () => <div className="flex items-center justify-center h-screen">Loading parts inventory...</div>,
  }
);

export default function PartsInventoryPage() {
  return <PartsInventory />;
}

