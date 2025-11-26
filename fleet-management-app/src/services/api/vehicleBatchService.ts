/**
 * Vehicle Batch Operations API Service
 * 
 * Handles batch operations on multiple vehicles simultaneously.
 */

import { vehicleApi, type ApiResponse } from './baseApi';
import type { Vehicle } from '@/types';
import { transformBackendVehicles, type BackendVehicle } from './vehicleTransformers';

// Batch operation response type
export interface BatchOperationResponse {
  message: string;
  successCount: number;
  failedCount: number;
  updatedVehicles?: Vehicle[];
  deletedIds?: string[];
  failedIds: string[];
}

// Batch request types
export interface BatchUpdateStatusData {
  vehicleIds: string[];
  newStatus: number; // 0: idle, 1: active, 2: maintenance, 3: offline
  reason?: string;
  changedBy?: string;
}

export interface BatchUpdateFuelData {
  vehicleIds: string[];
  newFuelLevel: number;
}

export interface BatchScheduleMaintenanceData {
  vehicleIds: string[];
  maintenanceDate: string;
  setToMaintenanceStatus?: boolean;
  scheduledBy?: string;
}

export interface BatchDeleteData {
  vehicleIds: string[];
}

class VehicleBatchService {
  private readonly endpoint = '/api/vehicles/batch';

  /**
   * Update status for multiple vehicles at once
   */
  async batchUpdateStatus(data: BatchUpdateStatusData): Promise<ApiResponse<BatchOperationResponse>> {
    try {
      const response = await vehicleApi.post<{
        message: string;
        successCount: number;
        failedCount: number;
        updatedVehicles: BackendVehicle[];
        failedIds: string[];
      }>(`${this.endpoint}/update-status`, data);

      if (response.success && response.data) {
        const transformedVehicles = response.data.updatedVehicles 
          ? transformBackendVehicles(response.data.updatedVehicles)
          : [];

        return {
          ...response,
          data: {
            message: response.data.message,
            successCount: response.data.successCount,
            failedCount: response.data.failedCount,
            updatedVehicles: transformedVehicles,
            failedIds: response.data.failedIds
          }
        };
      }

      return response as unknown as ApiResponse<BatchOperationResponse>;
    } catch (error) {
      console.error('Error in batch status update:', error);
      return {
        data: {
          message: 'Failed to update vehicle statuses',
          successCount: 0,
          failedCount: data.vehicleIds.length,
          failedIds: data.vehicleIds
        },
        success: false,
        error: 'Failed to perform batch status update'
      };
    }
  }

  /**
   * Update fuel level for multiple vehicles at once
   */
  async batchUpdateFuel(data: BatchUpdateFuelData): Promise<ApiResponse<BatchOperationResponse>> {
    try {
      const response = await vehicleApi.post<{
        message: string;
        successCount: number;
        failedCount: number;
        updatedVehicles: BackendVehicle[];
        failedIds: string[];
      }>(`${this.endpoint}/update-fuel`, data);

      if (response.success && response.data) {
        const transformedVehicles = response.data.updatedVehicles 
          ? transformBackendVehicles(response.data.updatedVehicles)
          : [];

        return {
          ...response,
          data: {
            message: response.data.message,
            successCount: response.data.successCount,
            failedCount: response.data.failedCount,
            updatedVehicles: transformedVehicles,
            failedIds: response.data.failedIds
          }
        };
      }

      return response as unknown as ApiResponse<BatchOperationResponse>;
    } catch (error) {
      console.error('Error in batch fuel update:', error);
      return {
        data: {
          message: 'Failed to update vehicle fuel levels',
          successCount: 0,
          failedCount: data.vehicleIds.length,
          failedIds: data.vehicleIds
        },
        success: false,
        error: 'Failed to perform batch fuel update'
      };
    }
  }

  /**
   * Schedule maintenance for multiple vehicles at once
   */
  async batchScheduleMaintenance(data: BatchScheduleMaintenanceData): Promise<ApiResponse<BatchOperationResponse>> {
    try {
      const response = await vehicleApi.post<{
        message: string;
        successCount: number;
        failedCount: number;
        updatedVehicles: BackendVehicle[];
        failedIds: string[];
      }>(`${this.endpoint}/schedule-maintenance`, data);

      if (response.success && response.data) {
        const transformedVehicles = response.data.updatedVehicles 
          ? transformBackendVehicles(response.data.updatedVehicles)
          : [];

        return {
          ...response,
          data: {
            message: response.data.message,
            successCount: response.data.successCount,
            failedCount: response.data.failedCount,
            updatedVehicles: transformedVehicles,
            failedIds: response.data.failedIds
          }
        };
      }

      return response as unknown as ApiResponse<BatchOperationResponse>;
    } catch (error) {
      console.error('Error in batch maintenance scheduling:', error);
      return {
        data: {
          message: 'Failed to schedule maintenance for vehicles',
          successCount: 0,
          failedCount: data.vehicleIds.length,
          failedIds: data.vehicleIds
        },
        success: false,
        error: 'Failed to perform batch maintenance scheduling'
      };
    }
  }

  /**
   * Delete multiple vehicles at once
   */
  async batchDelete(data: BatchDeleteData): Promise<ApiResponse<BatchOperationResponse>> {
    try {
      const response = await vehicleApi.post<{
        message: string;
        successCount: number;
        failedCount: number;
        deletedIds: string[];
        failedIds: string[];
      }>(`${this.endpoint}/delete`, data);

      if (response.success && response.data) {
        return {
          ...response,
          data: {
            message: response.data.message,
            successCount: response.data.successCount,
            failedCount: response.data.failedCount,
            deletedIds: response.data.deletedIds,
            failedIds: response.data.failedIds
          }
        };
      }

      return response as ApiResponse<BatchOperationResponse>;
    } catch (error) {
      console.error('Error in batch delete:', error);
      return {
        data: {
          message: 'Failed to delete vehicles',
          successCount: 0,
          failedCount: data.vehicleIds.length,
          failedIds: data.vehicleIds
        },
        success: false,
        error: 'Failed to perform batch delete'
      };
    }
  }

  /**
   * Helper to set all selected vehicles to maintenance mode
   */
  async setMaintenanceMode(vehicleIds: string[], reason?: string, changedBy?: string): Promise<ApiResponse<BatchOperationResponse>> {
    return this.batchUpdateStatus({
      vehicleIds,
      newStatus: 2, // maintenance
      reason: reason || 'Set to maintenance mode',
      changedBy: changedBy || 'System'
    });
  }

  /**
   * Helper to set all selected vehicles to active mode
   */
  async setActiveMode(vehicleIds: string[], reason?: string, changedBy?: string): Promise<ApiResponse<BatchOperationResponse>> {
    return this.batchUpdateStatus({
      vehicleIds,
      newStatus: 1, // active
      reason: reason || 'Set to active mode',
      changedBy: changedBy || 'System'
    });
  }

  /**
   * Helper to set all selected vehicles to idle mode
   */
  async setIdleMode(vehicleIds: string[], reason?: string, changedBy?: string): Promise<ApiResponse<BatchOperationResponse>> {
    return this.batchUpdateStatus({
      vehicleIds,
      newStatus: 0, // idle
      reason: reason || 'Set to idle mode',
      changedBy: changedBy || 'System'
    });
  }

  /**
   * Helper to refuel all selected vehicles to 100%
   */
  async refuelAll(vehicleIds: string[]): Promise<ApiResponse<BatchOperationResponse>> {
    return this.batchUpdateFuel({
      vehicleIds,
      newFuelLevel: 100
    });
  }
}

export const vehicleBatchService = new VehicleBatchService();

