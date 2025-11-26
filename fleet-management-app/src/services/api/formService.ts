/**
 * Driver Form API Service
 * 
 * Handles all driver performance form-related API calls to the Java Spring Boot backend (port 6001).
 * Manages driver performance metrics, fuel efficiency, and on-time ratings.
 */

import type { DriverForm, DriverFormFormState, PerformanceTrends } from '@/types';
import { driverApi, type ApiResponse } from './baseApi';

class FormService {
  private readonly endpoint = '/api/forms';

  /**
   * Get all forms
   * GET /api/forms/list
   */
  async getAll(): Promise<ApiResponse<DriverForm[]>> {
    try {
      return await driverApi.get<DriverForm[]>(`${this.endpoint}/list`);
    } catch (error) {
      console.error('Failed to fetch forms:', error);
      return {
        data: [] as DriverForm[],
        success: false,
        error: 'Failed to fetch forms'
      };
    }
  }

  /**
   * Get form by ID
   * GET /api/forms/{id}
   */
  async getById(id: number): Promise<ApiResponse<DriverForm>> {
    try {
      return await driverApi.get<DriverForm>(`${this.endpoint}/${id}`);
    } catch (error) {
      console.error(`Failed to fetch form ${id}:`, error);
      return {
        data: {} as DriverForm,
        success: false,
        error: 'Failed to fetch form'
      };
    }
  }

  /**
   * Get forms by driver ID
   * GET /api/forms/driver/{driverId}
   */
  async getByDriverId(driverId: number): Promise<ApiResponse<DriverForm[]>> {
    try {
      return await driverApi.get<DriverForm[]>(`${this.endpoint}/driver/${driverId}`);
    } catch (error) {
      console.error(`Failed to fetch forms for driver ${driverId}:`, error);
      return {
        data: [] as DriverForm[],
        success: false,
        error: 'Failed to fetch driver forms'
      };
    }
  }

  /**
   * Create new form
   * POST /api/forms
   */
  async create(formData: DriverFormFormState): Promise<ApiResponse<string>> {
    try {
      return await driverApi.post<string>(this.endpoint, formData);
    } catch (error) {
      console.error('Failed to create form:', error);
      return {
        data: '' as string,
        success: false,
        error: 'Failed to create form'
      };
    }
  }

  /**
   * Update form
   * PUT /api/forms/{id}
   */
  async update(id: number, formData: Partial<DriverForm>): Promise<ApiResponse<DriverForm>> {
    try {
      return await driverApi.put<DriverForm>(`${this.endpoint}/${id}`, formData);
    } catch (error) {
      console.error(`Failed to update form ${id}:`, error);
      return {
        data: {} as DriverForm,
        success: false,
        error: 'Failed to update form'
      };
    }
  }

  /**
   * Delete form
   * DELETE /api/forms/{id}
   */
  async delete(id: number): Promise<ApiResponse<string>> {
    try {
      return await driverApi.delete<string>(`${this.endpoint}/${id}`);
    } catch (error) {
      console.error(`Failed to delete form ${id}:`, error);
      return {
        data: '' as string,
        success: false,
        error: 'Failed to delete form'
      };
    }
  }

  /**
   * Calculate average performance metrics for a driver
   */
  calculateAverageMetrics(forms: DriverForm[]): {
    avgScore: number;
    avgFuelEfficiency: number;
    avgOnTimeRate: number;
  } {
    if (forms.length === 0) {
      return { avgScore: 0, avgFuelEfficiency: 0, avgOnTimeRate: 0 };
    }

    const totals = forms.reduce(
      (acc, form) => ({
        score: acc.score + form.score,
        fuelEfficiency: acc.fuelEfficiency + form.fuelEfficiency,
        onTimeRate: acc.onTimeRate + form.onTimeRate
      }),
      { score: 0, fuelEfficiency: 0, onTimeRate: 0 }
    );

    return {
      avgScore: Number((totals.score / forms.length).toFixed(2)),
      avgFuelEfficiency: Number((totals.fuelEfficiency / forms.length).toFixed(2)),
      avgOnTimeRate: Number((totals.onTimeRate / forms.length).toFixed(2))
    };
  }

  /**
   * Get performance trends for a driver
   * GET /api/forms/trends/{driverId}?limit={limit}
   */
  async getPerformanceTrends(driverId: number, limit: number = 10): Promise<ApiResponse<PerformanceTrends>> {
    try {
      return await driverApi.get<PerformanceTrends>(`${this.endpoint}/trends/${driverId}?limit=${limit}`);
    } catch (error) {
      console.error(`Failed to fetch performance trends for driver ${driverId}:`, error);
      return {
        data: {
          formIds: [],
          scores: [],
          fuelEfficiencies: [],
          onTimeRates: [],
          averages: { score: 0, fuelEfficiency: 0, onTimeRate: 0 },
          totalForms: 0
        },
        success: false,
        error: 'Failed to fetch performance trends'
      };
    }
  }
}

export const formService = new FormService();

