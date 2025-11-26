/**
 * API Services barrel export
 * 
 * Centralized export point for all API services
 */

export { baseApi, API_CONFIG } from './baseApi';
export type { ApiResponse, ApiError } from './baseApi';

export { vehicleService } from './vehicleService';
export { driverService } from './driverService';
export { formService } from './formService';
export { scheduleService } from './scheduleService';
export { maintenanceService } from './maintenanceService';
export { reportsService } from './reportsService';
export { vehicleStatusService } from './vehicleStatusService';
export { vehicleBatchService } from './vehicleBatchService';
export type { 
  MaintenanceSummary, 
  PaginatedMaintenanceResponse, 
  MaintenanceFilters,
  MaintenanceCreateData,
  MaintenanceUpdateData 
} from './maintenanceService';
export type {
  FleetPerformanceReport,
  FuelConsumptionReport,
  MaintenanceSummaryReport,
  FleetSummaryReport
} from './reportsService';
export type {
  VehicleStatusHistory,
  AssignDriverData,
  UnassignDriverData
} from './vehicleStatusService';
export type {
  BatchOperationResponse,
  BatchUpdateStatusData,
  BatchUpdateFuelData,
  BatchScheduleMaintenanceData,
  BatchDeleteData
} from './vehicleBatchService';

