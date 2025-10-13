/**
 * Vehicle API Service
 * 
 * Handles all vehicle-related API calls.
 * Currently returns mock data, but structured for easy backend integration.
 */

import type { Vehicle, VehicleFormState } from '@/types';
import { baseApi, type ApiResponse } from './baseApi';

class VehicleService {
  private readonly endpoint = '/vehicles';

  /**
   * Get all vehicles
   * TODO: Replace with actual API call when backend is ready
   */
  async getAll(): Promise<ApiResponse<Vehicle[]>> {
    // return baseApi.get<Vehicle[]>(this.endpoint);
    
    // Mock implementation for now
    return Promise.resolve({
      data: [], // Mock data would go here
      success: true
    });
  }

  /**
   * Get vehicle by ID
   */
  async getById(id: string): Promise<ApiResponse<Vehicle>> {
    // return baseApi.get<Vehicle>(`${this.endpoint}/${id}`);
    
    return Promise.resolve({
      data: {} as Vehicle,
      success: true
    });
  }

  /**
   * Create new vehicle
   */
  async create(vehicleData: VehicleFormState): Promise<ApiResponse<Vehicle>> {
    // return baseApi.post<Vehicle>(this.endpoint, vehicleData);
    
    return Promise.resolve({
      data: {} as Vehicle,
      success: true,
      message: 'Vehicle created successfully'
    });
  }

  /**
   * Update vehicle
   */
  async update(id: string, vehicleData: Partial<Vehicle>): Promise<ApiResponse<Vehicle>> {
    // return baseApi.put<Vehicle>(`${this.endpoint}/${id}`, vehicleData);
    
    return Promise.resolve({
      data: {} as Vehicle,
      success: true,
      message: 'Vehicle updated successfully'
    });
  }

  /**
   * Delete vehicle
   */
  async delete(id: string): Promise<ApiResponse<void>> {
    // return baseApi.delete<void>(`${this.endpoint}/${id}`);
    
    return Promise.resolve({
      data: undefined as void,
      success: true,
      message: 'Vehicle deleted successfully'
    });
  }

  /**
   * Get vehicles by status
   */
  async getByStatus(status: string): Promise<ApiResponse<Vehicle[]>> {
    // return baseApi.get<Vehicle[]>(this.endpoint, { status });
    
    return Promise.resolve({
      data: [],
      success: true
    });
  }
}

export const vehicleService = new VehicleService();

