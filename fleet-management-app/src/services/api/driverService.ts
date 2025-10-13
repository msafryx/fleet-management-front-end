/**
 * Driver API Service
 * 
 * Handles all driver-related API calls.
 * Currently returns mock data, but structured for easy backend integration.
 */

import type { Driver, DriverFormState } from '@/types';
import { baseApi, type ApiResponse } from './baseApi';

class DriverService {
  private readonly endpoint = '/drivers';

  async getAll(): Promise<ApiResponse<Driver[]>> {
    // return baseApi.get<Driver[]>(this.endpoint);
    return Promise.resolve({ data: [], success: true });
  }

  async getById(id: string): Promise<ApiResponse<Driver>> {
    // return baseApi.get<Driver>(`${this.endpoint}/${id}`);
    return Promise.resolve({ data: {} as Driver, success: true });
  }

  async create(driverData: DriverFormState): Promise<ApiResponse<Driver>> {
    // return baseApi.post<Driver>(this.endpoint, driverData);
    return Promise.resolve({ 
      data: {} as Driver, 
      success: true,
      message: 'Driver created successfully'
    });
  }

  async update(id: string, driverData: Partial<Driver>): Promise<ApiResponse<Driver>> {
    // return baseApi.put<Driver>(`${this.endpoint}/${id}`, driverData);
    return Promise.resolve({ 
      data: {} as Driver, 
      success: true,
      message: 'Driver updated successfully'
    });
  }

  async delete(id: string): Promise<ApiResponse<void>> {
    // return baseApi.delete<void>(`${this.endpoint}/${id}`);
    return Promise.resolve({ 
      data: undefined as void, 
      success: true,
      message: 'Driver deleted successfully'
    });
  }

  async assignVehicle(driverId: string, vehicleId: string): Promise<ApiResponse<Driver>> {
    // return baseApi.patch<Driver>(`${this.endpoint}/${driverId}/assign-vehicle`, { vehicleId });
    return Promise.resolve({ 
      data: {} as Driver, 
      success: true,
      message: 'Vehicle assigned successfully'
    });
  }
}

export const driverService = new DriverService();

