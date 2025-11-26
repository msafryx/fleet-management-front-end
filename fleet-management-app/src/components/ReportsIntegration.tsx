/**
 * Reports Integration Component
 * 
 * Demonstrates how to use the new reports API endpoints
 * This component can be integrated into the Reports page
 */

'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { 
  FileText, 
  TrendingUp, 
  Fuel, 
  Wrench, 
  Download,
  RefreshCw,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { reportsService } from '@/services/api';
import type { 
  FleetPerformanceReport, 
  FuelConsumptionReport, 
  MaintenanceSummaryReport,
  FleetSummaryReport 
} from '@/services/api';

export function ReportsIntegration() {
  const [isLoadingFleet, setIsLoadingFleet] = useState(false);
  const [isLoadingFuel, setIsLoadingFuel] = useState(false);
  const [isLoadingMaintenance, setIsLoadingMaintenance] = useState(false);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);

  const [fleetReport, setFleetReport] = useState<FleetPerformanceReport | null>(null);
  const [fuelReport, setFuelReport] = useState<FuelConsumptionReport | null>(null);
  const [maintenanceReport, setMaintenanceReport] = useState<MaintenanceSummaryReport | null>(null);
  const [summaryReport, setSummaryReport] = useState<FleetSummaryReport | null>(null);

  const [error, setError] = useState<string | null>(null);

  const fetchFleetPerformance = async () => {
    setIsLoadingFleet(true);
    setError(null);
    try {
      const response = await reportsService.getFleetPerformance('month');
      if (response.success && response.data) {
        setFleetReport(response.data);
      } else {
        setError(response.error || 'Failed to fetch fleet performance report');
      }
    } catch (err) {
      setError('Error fetching fleet performance report');
      console.error(err);
    } finally {
      setIsLoadingFleet(false);
    }
  };

  const fetchFuelConsumption = async () => {
    setIsLoadingFuel(true);
    setError(null);
    try {
      const response = await reportsService.getFuelConsumption('month');
      if (response.success && response.data) {
        setFuelReport(response.data);
      } else {
        setError(response.error || 'Failed to fetch fuel consumption report');
      }
    } catch (err) {
      setError('Error fetching fuel consumption report');
      console.error(err);
    } finally {
      setIsLoadingFuel(false);
    }
  };

  const fetchMaintenanceSummary = async () => {
    setIsLoadingMaintenance(true);
    setError(null);
    try {
      const response = await reportsService.getMaintenanceSummary('month');
      if (response.success && response.data) {
        setMaintenanceReport(response.data);
      } else {
        setError(response.error || 'Failed to fetch maintenance summary report');
      }
    } catch (err) {
      setError('Error fetching maintenance summary report');
      console.error(err);
    } finally {
      setIsLoadingMaintenance(false);
    }
  };

  const fetchFleetSummary = async () => {
    setIsLoadingSummary(true);
    setError(null);
    try {
      const response = await reportsService.getFleetSummary();
      if (response.success && response.data) {
        setSummaryReport(response.data);
      } else {
        setError(response.error || 'Failed to fetch fleet summary report');
      }
    } catch (err) {
      setError('Error fetching fleet summary report');
      console.error(err);
    } finally {
      setIsLoadingSummary(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Fleet Reports</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive fleet analytics and reporting
          </p>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Report Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              Fleet Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={fetchFleetPerformance} 
              disabled={isLoadingFleet}
              className="w-full"
              size="sm"
            >
              {isLoadingFleet ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                'Generate Report'
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Fuel className="h-4 w-4 text-green-600" />
              Fuel Consumption
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={fetchFuelConsumption} 
              disabled={isLoadingFuel}
              className="w-full"
              size="sm"
            >
              {isLoadingFuel ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                'Generate Report'
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Wrench className="h-4 w-4 text-orange-600" />
              Maintenance Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={fetchMaintenanceSummary} 
              disabled={isLoadingMaintenance}
              className="w-full"
              size="sm"
            >
              {isLoadingMaintenance ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                'Generate Report'
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <FileText className="h-4 w-4 text-purple-600" />
              Fleet Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={fetchFleetSummary} 
              disabled={isLoadingSummary}
              className="w-full"
              size="sm"
            >
              {isLoadingSummary ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                'Generate Report'
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Fleet Performance Report Display */}
      {fleetReport && (
        <Card>
          <CardHeader>
            <CardTitle>Fleet Performance Report</CardTitle>
            <CardDescription>
              Generated: {new Date(fleetReport.generatedAt).toLocaleString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Vehicles</p>
                <p className="text-2xl font-bold">{fleetReport.summary.totalVehicles}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Active Vehicles</p>
                <p className="text-2xl font-bold">{fleetReport.summary.activeVehicles}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Utilization Rate</p>
                <p className="text-2xl font-bold">{fleetReport.summary.utilizationRate.toFixed(1)}%</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Average Mileage</p>
                <p className="text-2xl font-bold">{fleetReport.summary.averageMileage.toFixed(0)} km</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Mileage</p>
                <p className="text-2xl font-bold">{fleetReport.summary.totalMileage.toFixed(0)} km</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Fuel Consumption Report Display */}
      {fuelReport && (
        <Card>
          <CardHeader>
            <CardTitle>Fuel Consumption Analysis</CardTitle>
            <CardDescription>
              Generated: {new Date(fuelReport.generatedAt).toLocaleString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Average Fuel Level</p>
                <p className="text-2xl font-bold">{fuelReport.summary.averageFuelLevel.toFixed(1)}%</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Low Fuel Vehicles</p>
                <p className="text-2xl font-bold text-orange-600">{fuelReport.summary.lowFuelVehicles}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Critical Fuel</p>
                <p className="text-2xl font-bold text-red-600">{fuelReport.summary.criticalFuelVehicles}</p>
              </div>
            </div>
            
            {fuelReport.summary.fuelTypeDistribution.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Fuel Type Distribution</p>
                <div className="flex flex-wrap gap-2">
                  {fuelReport.summary.fuelTypeDistribution.map((item, idx) => (
                    <Badge key={idx} variant="outline">
                      {item.fuelType}: {item.count} vehicles
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Maintenance Summary Report Display */}
      {maintenanceReport && (
        <Card>
          <CardHeader>
            <CardTitle>Maintenance Summary Report</CardTitle>
            <CardDescription>
              Generated: {new Date(maintenanceReport.generatedAt).toLocaleString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">In Maintenance</p>
                <p className="text-2xl font-bold">{maintenanceReport.summary.inMaintenance}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Due Soon</p>
                <p className="text-2xl font-bold text-orange-600">{maintenanceReport.summary.maintenanceDueSoon}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Overdue</p>
                <p className="text-2xl font-bold text-red-600">{maintenanceReport.summary.overdueCount}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Next Week</p>
                <p className="text-2xl font-bold">{maintenanceReport.summary.nextWeekScheduled}</p>
              </div>
            </div>

            {maintenanceReport.upcomingMaintenance.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Upcoming Maintenance</p>
                <div className="space-y-2">
                  {maintenanceReport.upcomingMaintenance.slice(0, 5).map((item) => (
                    <div key={item.vehicleId} className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <p className="font-medium">{item.make} {item.model}</p>
                        <p className="text-sm text-muted-foreground">{item.licensePlate}</p>
                      </div>
                      <Badge variant={item.priority === 'overdue' ? 'destructive' : 'default'}>
                        {item.priority}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Fleet Summary Report Display */}
      {summaryReport && (
        <Card>
          <CardHeader>
            <CardTitle>Fleet Summary Report</CardTitle>
            <CardDescription>
              Generated: {new Date(summaryReport.generatedAt).toLocaleString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">Fleet Overview</p>
              <div className="grid gap-3 md:grid-cols-5">
                <div className="text-center p-3 border rounded">
                  <p className="text-2xl font-bold">{summaryReport.fleetOverview.totalVehicles}</p>
                  <p className="text-xs text-muted-foreground">Total</p>
                </div>
                <div className="text-center p-3 border rounded">
                  <p className="text-2xl font-bold text-green-600">{summaryReport.fleetOverview.activeVehicles}</p>
                  <p className="text-xs text-muted-foreground">Active</p>
                </div>
                <div className="text-center p-3 border rounded">
                  <p className="text-2xl font-bold text-orange-600">{summaryReport.fleetOverview.idleVehicles}</p>
                  <p className="text-xs text-muted-foreground">Idle</p>
                </div>
                <div className="text-center p-3 border rounded">
                  <p className="text-2xl font-bold text-yellow-600">{summaryReport.fleetOverview.maintenanceVehicles}</p>
                  <p className="text-xs text-muted-foreground">Maintenance</p>
                </div>
                <div className="text-center p-3 border rounded">
                  <p className="text-2xl font-bold text-red-600">{summaryReport.fleetOverview.offlineVehicles}</p>
                  <p className="text-xs text-muted-foreground">Offline</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Mileage Statistics</p>
              <div className="grid gap-3 md:grid-cols-4">
                <div className="p-3 border rounded">
                  <p className="text-lg font-bold">{summaryReport.mileageStats.totalMileage.toFixed(0)}</p>
                  <p className="text-xs text-muted-foreground">Total Mileage</p>
                </div>
                <div className="p-3 border rounded">
                  <p className="text-lg font-bold">{summaryReport.mileageStats.averageMileage.toFixed(0)}</p>
                  <p className="text-xs text-muted-foreground">Average</p>
                </div>
                <div className="p-3 border rounded">
                  <p className="text-lg font-bold">{summaryReport.mileageStats.highestMileage.toFixed(0)}</p>
                  <p className="text-xs text-muted-foreground">Highest</p>
                </div>
                <div className="p-3 border rounded">
                  <p className="text-lg font-bold">{summaryReport.mileageStats.lowestMileage.toFixed(0)}</p>
                  <p className="text-xs text-muted-foreground">Lowest</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

