/**
 * Driver Schedule API Service
 * 
 * Handles all driver schedule-related API calls to the Java Spring Boot backend (port 6001).
 * Manages driver schedules, routes, and vehicle assignments.
 */

import type { DriverSchedule, DriverScheduleFormState, ScheduleStatus } from '@/types';
import { driverApi, type ApiResponse } from './baseApi';

class ScheduleService {
  private readonly endpoint = '/api/schedules';

  /**
   * Get all schedules
   * GET /api/schedules/list
   */
  async getAll(): Promise<ApiResponse<DriverSchedule[]>> {
    try {
      return await driverApi.get<DriverSchedule[]>(`${this.endpoint}/list`);
    } catch (error) {
      console.error('Failed to fetch schedules:', error);
      return {
        data: [] as DriverSchedule[],
        success: false,
        error: 'Failed to fetch schedules'
      };
    }
  }

  /**
   * Get schedule by ID
   * GET /api/schedules/{scheduleId}
   */
  async getById(scheduleId: number): Promise<ApiResponse<DriverSchedule>> {
    try {
      return await driverApi.get<DriverSchedule>(`${this.endpoint}/${scheduleId}`);
    } catch (error) {
      console.error(`Failed to fetch schedule ${scheduleId}:`, error);
      return {
        data: {} as DriverSchedule,
        success: false,
        error: 'Failed to fetch schedule'
      };
    }
  }

  /**
   * Get schedules by driver ID
   * GET /api/schedules/driver/{driverId}
   */
  async getByDriverId(driverId: string): Promise<ApiResponse<DriverSchedule[]>> {
    try {
      return await driverApi.get<DriverSchedule[]>(`${this.endpoint}/driver/${driverId}`);
    } catch (error) {
      console.error(`Failed to fetch schedules for driver ${driverId}:`, error);
      return {
        data: [] as DriverSchedule[],
        success: false,
        error: 'Failed to fetch driver schedules'
      };
    }
  }

  /**
   * Get schedules by status
   * GET /api/schedules/status/{status}
   */
  async getByStatus(status: ScheduleStatus): Promise<ApiResponse<DriverSchedule[]>> {
    try {
      return await driverApi.get<DriverSchedule[]>(`${this.endpoint}/status/${status}`);
    } catch (error) {
      console.error(`Failed to fetch schedules with status ${status}:`, error);
      return {
        data: [] as DriverSchedule[],
        success: false,
        error: 'Failed to fetch schedules by status'
      };
    }
  }

  /**
   * Create new schedule
   * POST /api/schedules
   */
  async create(scheduleData: DriverScheduleFormState): Promise<ApiResponse<string>> {
    try {
      return await driverApi.post<string>(this.endpoint, scheduleData);
    } catch (error) {
      console.error('Failed to create schedule:', error);
      return {
        data: '' as string,
        success: false,
        error: 'Failed to create schedule'
      };
    }
  }

  /**
   * Update schedule
   * PUT /api/schedules/{scheduleId}
   */
  async update(scheduleId: number, scheduleData: Partial<DriverSchedule>): Promise<ApiResponse<DriverSchedule>> {
    try {
      return await driverApi.put<DriverSchedule>(`${this.endpoint}/${scheduleId}`, scheduleData);
    } catch (error) {
      console.error(`Failed to update schedule ${scheduleId}:`, error);
      return {
        data: {} as DriverSchedule,
        success: false,
        error: 'Failed to update schedule'
      };
    }
  }

  /**
   * Delete schedule
   * DELETE /api/schedules/{scheduleId}
   */
  async delete(scheduleId: number): Promise<ApiResponse<string>> {
    try {
      return await driverApi.delete<string>(`${this.endpoint}/${scheduleId}`);
    } catch (error) {
      console.error(`Failed to delete schedule ${scheduleId}:`, error);
      return {
        data: '' as string,
        success: false,
        error: 'Failed to delete schedule'
      };
    }
  }

  /**
   * Get schedule statistics
   */
  getStatistics(schedules: DriverSchedule[]): {
    total: number;
    byStatus: Record<ScheduleStatus, number>;
  } {
    const byStatus: Record<ScheduleStatus, number> = {
      pending: 0,
      active: 0,
      completed: 0,
      cancelled: 0
    };

    schedules.forEach(schedule => {
      if (schedule.status in byStatus) {
        byStatus[schedule.status]++;
      }
    });

    return {
      total: schedules.length,
      byStatus
    };
  }

  /**
   * Check for schedule conflicts
   * GET /api/schedules/conflicts?driverId={driverId}&startTime={startTime}&endTime={endTime}&excludeScheduleId={excludeScheduleId}
   */
  async checkConflicts(
    driverId: string,
    startTime: string,
    endTime: string,
    excludeScheduleId?: number
  ): Promise<ApiResponse<DriverSchedule[]>> {
    try {
      const params = new URLSearchParams({
        driverId,
        startTime,
        endTime,
      });
      
      if (excludeScheduleId !== undefined) {
        params.append('excludeScheduleId', excludeScheduleId.toString());
      }

      return await driverApi.get<DriverSchedule[]>(`${this.endpoint}/conflicts?${params.toString()}`);
    } catch (error) {
      console.error('Failed to check schedule conflicts:', error);
      return {
        data: [] as DriverSchedule[],
        success: false,
        error: 'Failed to check schedule conflicts'
      };
    }
  }
}

export const scheduleService = new ScheduleService();

