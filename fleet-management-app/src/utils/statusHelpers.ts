/**
 * Status and Badge Helper Utilities
 * 
 * Centralized logic for rendering status badges and icons
 * to ensure consistency across the application.
 */

import React from 'react';
import {
  CheckCircle,
  Clock,
  AlertTriangle,
  Wrench,
  UserX,
  Navigation,
  Star
} from 'lucide-react';
import type { 
  VehicleStatus, 
  DriverStatus, 
  TripStatus, 
  MaintenanceStatus,
  FuelStatus,
  StatusConfigMap,
  BadgeConfig
} from '@/types';

// ============================================================================
// VEHICLE STATUS
// ============================================================================

export const vehicleStatusConfig: StatusConfigMap<VehicleStatus> = {
  active: {
    label: 'Active',
    variant: 'default',
    icon: CheckCircle
  },
  idle: {
    label: 'Idle',
    variant: 'secondary',
    icon: Clock
  },
  maintenance: {
    label: 'Maintenance',
    variant: 'destructive',
    icon: Wrench
  },
  offline: {
    label: 'Offline',
    variant: 'outline',
    icon: AlertTriangle
  }
};

export function getVehicleStatusConfig(status: VehicleStatus): BadgeConfig {
  return vehicleStatusConfig[status] || vehicleStatusConfig.offline;
}

// ============================================================================
// DRIVER STATUS
// ============================================================================

export const driverStatusConfig: StatusConfigMap<DriverStatus> = {
  active: {
    label: 'Active',
    variant: 'default',
    icon: CheckCircle
  },
  'off-duty': {
    label: 'Off Duty',
    variant: 'secondary',
    icon: Clock
  },
  unavailable: {
    label: 'Unavailable',
    variant: 'destructive',
    icon: UserX
  }
};

export function getDriverStatusConfig(status: DriverStatus): BadgeConfig {
  return driverStatusConfig[status] || driverStatusConfig.unavailable;
}

// ============================================================================
// TRIP STATUS
// ============================================================================

export const tripStatusConfig: StatusConfigMap<TripStatus> = {
  in_progress: {
    label: 'In Progress',
    variant: 'default',
    icon: Navigation
  },
  completed: {
    label: 'Completed',
    variant: 'secondary',
    icon: CheckCircle
  },
  scheduled: {
    label: 'Scheduled',
    variant: 'outline',
    icon: Clock
  },
  delayed: {
    label: 'Delayed',
    variant: 'destructive',
    icon: AlertTriangle
  }
};

export function getTripStatusConfig(status: TripStatus): BadgeConfig {
  return tripStatusConfig[status] || tripStatusConfig.scheduled;
}

// ============================================================================
// MAINTENANCE STATUS
// ============================================================================

export const maintenanceStatusConfig: StatusConfigMap<MaintenanceStatus> = {
  overdue: {
    label: 'Overdue',
    variant: 'destructive',
    icon: AlertTriangle
  },
  due_soon: {
    label: 'Due Soon',
    variant: 'secondary',
    icon: Clock
  },
  scheduled: {
    label: 'Scheduled',
    variant: 'outline',
    icon: Clock
  },
  in_progress: {
    label: 'In Progress',
    variant: 'default',
    icon: Wrench
  },
  completed: {
    label: 'Completed',
    variant: 'secondary',
    icon: CheckCircle
  }
};

export function getMaintenanceStatusConfig(status: MaintenanceStatus): BadgeConfig {
  return maintenanceStatusConfig[status] || maintenanceStatusConfig.scheduled;
}

// ============================================================================
// FUEL STATUS
// ============================================================================

export const fuelStatusConfig: StatusConfigMap<FuelStatus> = {
  normal: {
    label: 'Normal',
    variant: 'secondary'
  },
  low: {
    label: 'Low Fuel',
    variant: 'secondary'
  },
  critical: {
    label: 'Critical',
    variant: 'destructive'
  }
};

export function getFuelStatusConfig(status: FuelStatus): BadgeConfig {
  return fuelStatusConfig[status] || fuelStatusConfig.normal;
}

// ============================================================================
// PRIORITY HELPERS
// ============================================================================

export interface PriorityConfig {
  label: string;
  className: string;
}

export const priorityConfig: Record<string, PriorityConfig> = {
  urgent: {
    label: 'Urgent',
    className: 'bg-red-100 text-red-800 border-red-200'
  },
  high: {
    label: 'High',
    className: 'bg-orange-100 text-orange-800 border-orange-200'
  },
  normal: {
    label: 'Normal',
    className: 'bg-green-100 text-green-800 border-green-200'
  },
  low: {
    label: 'Low',
    className: 'bg-blue-100 text-blue-800 border-blue-200'
  }
};

export function getPriorityConfig(priority: string): PriorityConfig {
  return priorityConfig[priority] || priorityConfig.normal;
}

export function getPriorityColor(priority: string): string {
  switch (priority) {
    case 'urgent':
      return 'text-red-600';
    case 'high':
      return 'text-orange-600';
    case 'medium':
      return 'text-yellow-600';
    case 'low':
      return 'text-green-600';
    default:
      return 'text-gray-600';
  }
}

// ============================================================================
// FUEL LEVEL HELPERS
// ============================================================================

export function getFuelLevelColor(level: number): string {
  if (level > 60) return 'bg-green-500';
  if (level > 30) return 'bg-yellow-500';
  return 'bg-red-500';
}

export function getFuelLevelStatus(level: number): FuelStatus {
  if (level > 30) return 'normal';
  if (level > 15) return 'low';
  return 'critical';
}

// ============================================================================
// USER HELPERS
// ============================================================================

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// ============================================================================
// CALCULATION HELPERS
// ============================================================================

export function getMileageProgress(current: number, due: number): number {
  return Math.min((current / due) * 100, 100);
}

