import React from 'react';
import { Button } from './ui/button';
import { Calendar, Download } from 'lucide-react';
import { PerformanceMetrics } from './analytics/PerformanceMetrics';
import { FuelConsumptionChart } from './analytics/FuelConsumptionChart';
import { VehicleUtilizationChart } from './analytics/VehicleUtilizationChart';
import { MaintenanceCostsChart } from './analytics/MaintenanceCostsChart';
import { InsightsSection } from './analytics/InsightsSection';

export function Analytics() {
  return (
    <div className="p-6 space-y-6 overflow-auto h-full">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Analytics & Reports</h2>
          <p className="text-muted-foreground">Analyze fleet performance and operational metrics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Date Range
          </Button>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <PerformanceMetrics />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FuelConsumptionChart />
        <VehicleUtilizationChart />
      </div>

      <MaintenanceCostsChart />

      <InsightsSection />
    </div>
  );
}