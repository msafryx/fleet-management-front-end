/**
 * Vehicle Status & Assignment API Service
 * 
 * Handles vehicle status history and driver assignment operations.
 */

import { vehicleApi, type ApiResponse } from './baseApi';
import type { Vehicle } from '@/types';
import { transformBackendVehicle, type BackendVehicle } from './vehicleTransformers';

// Status history types
export interface VehicleStatusHistory {
  id: string;
  vehicleId: string;
  status: string;
  changedBy: string;
  description: string;
  changedAt: string;
}

// Assignment request types
export interface AssignDriverData {
  driverName: string;
  assignedBy?: string;
}

export interface UnassignDriverData {
  unassignedBy?: string;
}

class VehicleStatusService {
  /**
   * Get status change history for a vehicle
   */
  async getStatusHistory(vehicleId: string): Promise<ApiResponse<VehicleStatusHistory[]>> {
    try {
      const response = await vehicleApi.get<VehicleStatusHistory[]>(
        `/api/vehicles/${vehicleId}/statushistory`
      );
      return response;
    } catch (error) {
      console.error('Error fetching status history:', error);
      return {
        data: [],
        success: false,
        error: 'Failed to fetch status history'
      };
    }
  }

  /**
   * Assign a driver to a vehicle
   */
  async assignDriver(
    vehicleId: string, 
    assignmentData: AssignDriverData
  ): Promise<ApiResponse<{ message: string; vehicle: Vehicle }>> {
    try {
      const response = await vehicleApi.post<{ message: string; vehicle: BackendVehicle }>(
        `/api/vehicles/${vehicleId}/assign-driver`,
        assignmentData
      );

      if (response.success && response.data?.vehicle) {
        const transformedVehicle = transformBackendVehicle(response.data.vehicle);
        return {
          ...response,
          data: {
            message: response.data.message,
            vehicle: transformedVehicle
          }
        };
      }

      return response as unknown as ApiResponse<{ message: string; vehicle: Vehicle }>;
    } catch (error) {
      console.error('Error assigning driver:', error);
      return {
        data: { message: '', vehicle: {} as Vehicle },
        success: false,
        error: 'Failed to assign driver'
      };
    }
  }

  /**
   * Unassign a driver from a vehicle
   */
  async unassignDriver(
    vehicleId: string,
    unassignmentData?: UnassignDriverData
  ): Promise<ApiResponse<{ message: string; previousDriver?: string; vehicle: Vehicle }>> {
    try {
      const response = await vehicleApi.post<{ 
        message: string; 
        previousDriver?: string; 
        vehicle: BackendVehicle 
      }>(
        `/api/vehicles/${vehicleId}/unassign-driver`,
        unassignmentData || {}
      );

      if (response.success && response.data?.vehicle) {
        const transformedVehicle = transformBackendVehicle(response.data.vehicle);
        return {
          ...response,
          data: {
            message: response.data.message,
            previousDriver: response.data.previousDriver,
            vehicle: transformedVehicle
          }
        };
      }

      return response as unknown as ApiResponse<{ message: string; previousDriver?: string; vehicle: Vehicle }>;
    } catch (error) {
      console.error('Error unassigning driver:', error);
      return {
        data: { message: '', vehicle: {} as Vehicle },
        success: false,
        error: 'Failed to unassign driver'
      };
    }
  }

  /**
   * Get all available vehicles (unassigned, idle, with sufficient fuel)
   */
  async getAvailableVehicles(): Promise<ApiResponse<Vehicle[]>> {
    try {
      const response = await vehicleApi.get<BackendVehicle[]>(
        '/api/vehicles/available'
      );

      if (response.success && response.data) {
        const transformedVehicles = response.data.map(transformBackendVehicle);
        return {
          ...response,
          data: transformedVehicles
        };
      }

      return response as unknown as ApiResponse<Vehicle[]>;
    } catch (error) {
      console.error('Error fetching available vehicles:', error);
      return {
        data: [],
        success: false,
        error: 'Failed to fetch available vehicles'
      };
    }
  }

  /**
   * Get all assigned vehicles (vehicles with drivers)
   */
  async getAssignedVehicles(): Promise<ApiResponse<Vehicle[]>> {
    try {
      const response = await vehicleApi.get<BackendVehicle[]>(
        '/api/vehicles/assigned'
      );

      if (response.success && response.data) {
        const transformedVehicles = response.data.map(transformBackendVehicle);
        return {
          ...response,
          data: transformedVehicles
        };
      }

      return response as unknown as ApiResponse<Vehicle[]>;
    } catch (error) {
      console.error('Error fetching assigned vehicles:', error);
      return {
        data: [],
        success: false,
        error: 'Failed to fetch assigned vehicles'
      };
    }
  }
}

export const vehicleStatusService = new VehicleStatusService();

