/**
 * Vehicle API Integration Examples
 * 
 * Comprehensive examples demonstrating all available vehicle API endpoints
 * and how to use them in React components.
 */

'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  vehicleService,
  maintenanceService,
  vehicleStatusService,
  vehicleBatchService,
  reportsService
} from '@/services/api';

export function VehicleApiExamples() {
  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [vehicleId, setVehicleId] = useState('');

  const runExample = async (exampleFn: () => Promise<void>) => {
    setIsLoading(true);
    setResult('Loading...');
    try {
      await exampleFn();
    } catch (error) {
      setResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Basic Vehicle Operations
  const getAllVehicles = async () => {
    const response = await vehicleService.getAll();
    setResult(JSON.stringify(response, null, 2));
  };

  const getVehicleById = async () => {
    if (!vehicleId) {
      setResult('Please enter a vehicle ID');
      return;
    }
    const response = await vehicleService.getById(vehicleId);
    setResult(JSON.stringify(response, null, 2));
  };

  const getVehicleStatistics = async () => {
    const response = await vehicleService.getStatistics();
    setResult(JSON.stringify(response, null, 2));
  };

  const getFuelData = async () => {
    const response = await vehicleService.getFuelData();
    setResult(JSON.stringify(response, null, 2));
  };

  const getLowFuelVehicles = async () => {
    const response = await vehicleService.getLowFuelVehicles(25);
    setResult(JSON.stringify(response, null, 2));
  };

  // Maintenance Records (via Python Service)
  const getMaintenanceRecords = async () => {
    if (!vehicleId) {
      setResult('Please enter a vehicle ID');
      return;
    }
    const response = await maintenanceService.getByVehicle(vehicleId);
    setResult(JSON.stringify(response, null, 2));
  };

  const getAllMaintenanceRecords = async () => {
    const response = await maintenanceService.getAll();
    setResult(JSON.stringify(response, null, 2));
  };

  const getMaintenanceStatistics = async () => {
    const response = await maintenanceService.getSummary();
    setResult(JSON.stringify(response, null, 2));
  };

  // Status & Assignment
  const getStatusHistory = async () => {
    if (!vehicleId) {
      setResult('Please enter a vehicle ID');
      return;
    }
    const response = await vehicleStatusService.getStatusHistory(vehicleId);
    setResult(JSON.stringify(response, null, 2));
  };

  const getAvailableVehicles = async () => {
    const response = await vehicleStatusService.getAvailableVehicles();
    setResult(JSON.stringify(response, null, 2));
  };

  const getAssignedVehicles = async () => {
    const response = await vehicleStatusService.getAssignedVehicles();
    setResult(JSON.stringify(response, null, 2));
  };

  // Reports
  const getFleetPerformance = async () => {
    const response = await reportsService.getFleetPerformance('month');
    setResult(JSON.stringify(response, null, 2));
  };

  const getFuelConsumption = async () => {
    const response = await reportsService.getFuelConsumption('month');
    setResult(JSON.stringify(response, null, 2));
  };

  const getMaintenanceSummary = async () => {
    const response = await reportsService.getMaintenanceSummary('month');
    setResult(JSON.stringify(response, null, 2));
  };

  const getFleetSummary = async () => {
    const response = await reportsService.getFleetSummary();
    setResult(JSON.stringify(response, null, 2));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Vehicle API Examples</h1>
        <p className="text-muted-foreground mt-1">
          Interactive examples of all available Vehicle Service API endpoints
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vehicle ID Input</CardTitle>
          <CardDescription>
            Enter a vehicle ID for operations that require it
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Input 
            placeholder="Enter Vehicle ID (GUID)" 
            value={vehicleId}
            onChange={(e) => setVehicleId(e.target.value)}
          />
        </CardContent>
      </Card>

      <Tabs defaultValue="basic" className="space-y-4">
        <TabsList>
          <TabsTrigger value="basic">Basic Operations</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="status">Status & Assignment</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Basic Vehicle Operations</CardTitle>
              <CardDescription>
                CRUD operations and basic queries
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  onClick={() => runExample(getAllVehicles)}
                  disabled={isLoading}
                  variant="outline"
                  size="sm"
                >
                  GET /api/vehicles
                </Button>
                <Button 
                  onClick={() => runExample(getVehicleById)}
                  disabled={isLoading || !vehicleId}
                  variant="outline"
                  size="sm"
                >
                  GET /api/vehicles/:id
                </Button>
                <Button 
                  onClick={() => runExample(getVehicleStatistics)}
                  disabled={isLoading}
                  variant="outline"
                  size="sm"
                >
                  GET /api/vehicles/statistics
                </Button>
                <Button 
                  onClick={() => runExample(getFuelData)}
                  disabled={isLoading}
                  variant="outline"
                  size="sm"
                >
                  GET /api/vehicles/fuel
                </Button>
                <Button 
                  onClick={() => runExample(getLowFuelVehicles)}
                  disabled={isLoading}
                  variant="outline"
                  size="sm"
                >
                  GET /api/vehicles/low-fuel
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Operations</CardTitle>
              <CardDescription>
                Maintenance records and statistics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  onClick={() => runExample(getMaintenanceRecords)}
                  disabled={isLoading || !vehicleId}
                  variant="outline"
                  size="sm"
                >
                  GET /vehicles/:id/maintenancerecords
                </Button>
                <Button 
                  onClick={() => runExample(getAllMaintenanceRecords)}
                  disabled={isLoading}
                  variant="outline"
                  size="sm"
                >
                  GET /api/maintenance
                </Button>
                <Button 
                  onClick={() => runExample(getMaintenanceStatistics)}
                  disabled={isLoading}
                  variant="outline"
                  size="sm"
                >
                  GET /api/maintenance/statistics
                </Button>
              </div>
              <Alert>
                <AlertDescription>
                  <strong>POST endpoints:</strong> Use maintenanceService.create() to create new records
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="status" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Status & Assignment Operations</CardTitle>
              <CardDescription>
                Vehicle status history and driver assignments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  onClick={() => runExample(getStatusHistory)}
                  disabled={isLoading || !vehicleId}
                  variant="outline"
                  size="sm"
                >
                  GET /vehicles/:id/statushistory
                </Button>
                <Button 
                  onClick={() => runExample(getAvailableVehicles)}
                  disabled={isLoading}
                  variant="outline"
                  size="sm"
                >
                  GET /api/vehicles/available
                </Button>
                <Button 
                  onClick={() => runExample(getAssignedVehicles)}
                  disabled={isLoading}
                  variant="outline"
                  size="sm"
                >
                  GET /api/vehicles/assigned
                </Button>
              </div>
              <Alert>
                <AlertDescription>
                  <strong>Assignment endpoints:</strong><br />
                  • POST /vehicles/:id/assign-driver<br />
                  • POST /vehicles/:id/unassign-driver
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Batch Operations</CardTitle>
              <CardDescription>
                Bulk operations on multiple vehicles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert>
                <AlertDescription>
                  <strong>Available batch endpoints:</strong><br />
                  • POST /api/vehicles/batch/update-status<br />
                  • POST /api/vehicles/batch/update-fuel<br />
                  • POST /api/vehicles/batch/schedule-maintenance<br />
                  • POST /api/vehicles/batch/delete<br /><br />
                  Use vehicleBatchService for these operations.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reports & Analytics</CardTitle>
              <CardDescription>
                Comprehensive fleet reporting
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  onClick={() => runExample(getFleetPerformance)}
                  disabled={isLoading}
                  variant="outline"
                  size="sm"
                >
                  GET /api/reports/fleet-performance
                </Button>
                <Button 
                  onClick={() => runExample(getFuelConsumption)}
                  disabled={isLoading}
                  variant="outline"
                  size="sm"
                >
                  GET /api/reports/fuel-consumption
                </Button>
                <Button 
                  onClick={() => runExample(getMaintenanceSummary)}
                  disabled={isLoading}
                  variant="outline"
                  size="sm"
                >
                  GET /api/reports/maintenance-summary
                </Button>
                <Button 
                  onClick={() => runExample(getFleetSummary)}
                  disabled={isLoading}
                  variant="outline"
                  size="sm"
                >
                  GET /api/reports/summary
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>API Response</CardTitle>
          <CardDescription>
            Result of the last API call
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-96 text-xs">
            {result || 'Click any button above to test an API endpoint'}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}

