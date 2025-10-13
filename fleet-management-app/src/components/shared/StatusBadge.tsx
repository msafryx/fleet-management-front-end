/**
 * StatusBadge Component
 * 
 * Reusable badge component for displaying status indicators
 * with consistent styling and icons across the application.
 */

import React from 'react';
import { Badge } from '@/components/ui/badge';
import type { BadgeConfig } from '@/types';

interface StatusBadgeProps {
  config: BadgeConfig;
  className?: string;
}

export const StatusBadge = React.memo<StatusBadgeProps>(function StatusBadge({ 
  config, 
  className 
}) {
  const Icon = config.icon;

  return (
    <Badge variant={config.variant} className={`gap-1 ${config.className || ''} ${className || ''}`}>
      {Icon && <Icon className="h-3 w-3" />}
      {config.label}
    </Badge>
  );
});

