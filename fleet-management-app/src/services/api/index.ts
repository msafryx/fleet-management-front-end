/**
 * API Services barrel export
 * 
 * Centralized export point for all API services
 */

export { baseApi, API_CONFIG } from './baseApi';
export type { ApiResponse, ApiError } from './baseApi';

export { vehicleService } from './vehicleService';
export { driverService } from './driverService';

// TODO: Add more services as needed:
// export { tripService } from './tripService';
// export { maintenanceService } from './maintenanceService';
// export { fuelService } from './fuelService';
// export { userService } from './userService';
// export { analyticsService } from './analyticsService';

