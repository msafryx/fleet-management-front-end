// Performance optimization: Added useMemo for expensive calculations
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Plus, 
  TrendingUp, 
  TrendingDown, 
  Fuel, 
  DollarSign, 
  BarChart3,
  AlertTriangle
} from 'lucide-react';

export function FuelManagement() {
  const fuelData = [
    {
      vehicle: 'VH-0123',
      driver: 'John Smith',
      currentLevel: 78,
      weeklyConsumption: 156.5,
      monthlyCost: 412.30,
      efficiency: 8.2,
      lastRefuel: '2024-02-22',
      status: 'normal'
    },
    {
      vehicle: 'VH-0456',
      driver: 'Sarah Johnson',
      currentLevel: 34,
      weeklyConsumption: 189.2,
      monthlyCost: 498.50,
      efficiency: 7.8,
      lastRefuel: '2024-02-20',
      status: 'low'
    },
    {
      vehicle: 'VH-0789',
      driver: 'Mike Wilson',
      currentLevel: 92,
      weeklyConsumption: 134.8,
      monthlyCost: 356.20,
      efficiency: 9.1,
      lastRefuel: '2024-02-23',
      status: 'normal'
    },
    {
      vehicle: 'VH-0321',
      driver: 'Emma Davis',
      currentLevel: 15,
      weeklyConsumption: 201.3,
      monthlyCost: 531.40,
      efficiency: 7.2,
      lastRefuel: '2024-02-19',
      status: 'critical'
    }
  ];

  const getFuelLevelColor = (level: number) => {
    if (level > 60) return 'bg-green-500';
    if (level > 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      normal: { label: 'Normal', variant: 'secondary' as const },
      low: { label: 'Low Fuel', variant: 'secondary' as const },
      critical: { label: 'Critical', variant: 'destructive' as const }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.normal;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  // Performance optimization: Memoize expensive calculations
  // Only recalculate when fuelData changes
  const totalMonthlyCost = useMemo(() => 
    fuelData.reduce((sum, vehicle) => sum + vehicle.monthlyCost, 0),
    [fuelData]
  );
  
  const averageEfficiency = useMemo(() => 
    fuelData.reduce((sum, vehicle) => sum + vehicle.efficiency, 0) / fuelData.length,
    [fuelData]
  );
  
  const lowFuelVehicles = useMemo(() => 
    fuelData.filter(vehicle => vehicle.currentLevel < 30).length,
    [fuelData]
  );

  return (
    <div className="p-6 space-y-6 overflow-auto h-full">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Fuel Management</h2>
          <p className="text-muted-foreground">Monitor fuel consumption and costs across your fleet</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Fuel Record
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Fuel Cost</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalMonthlyCost.toFixed(2)}</div>
            <div className="flex items-center gap-1 text-xs text-green-600">
              <TrendingDown className="h-3 w-3" />
              <span>-8% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Efficiency</CardTitle>
            <BarChart3 className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageEfficiency.toFixed(1)} L/100km</div>
            <div className="flex items-center gap-1 text-xs text-green-600">
              <TrendingUp className="h-3 w-3" />
              <span>+0.3 improvement</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Fuel Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowFuelVehicles}</div>
            <p className="text-xs text-muted-foreground">Vehicles need refueling</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Vehicles</CardTitle>
            <Fuel className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fuelData.length}</div>
            <p className="text-xs text-muted-foreground">Active in fleet</p>
          </CardContent>
        </Card>
      </div>

      {/* Fuel Status Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {fuelData.map((vehicle, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{vehicle.vehicle}</CardTitle>
                  <p className="text-sm text-muted-foreground">Driver: {vehicle.driver}</p>
                </div>
                {getStatusBadge(vehicle.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Fuel className="h-4 w-4 text-muted-foreground" />
                    <span>Fuel Level</span>
                  </div>
                  <span className="font-medium">{vehicle.currentLevel}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${getFuelLevelColor(vehicle.currentLevel)}`}
                    style={{ width: `${vehicle.currentLevel}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Weekly Consumption:</span>
                  <p className="font-medium">{vehicle.weeklyConsumption}L</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Monthly Cost:</span>
                  <p className="font-medium">${vehicle.monthlyCost}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Efficiency:</span>
                  <p className="font-medium">{vehicle.efficiency} L/100km</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Last Refuel:</span>
                  <p className="font-medium">{vehicle.lastRefuel}</p>
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t">
                <Button variant="outline" size="sm" className="flex-1">
                  View History
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start gap-2">
              <BarChart3 className="h-4 w-4" />
              Generate Fuel Report
            </Button>
            <Button variant="outline" className="justify-start gap-2">
              <AlertTriangle className="h-4 w-4" />
              Set Fuel Alerts
            </Button>
            <Button variant="outline" className="justify-start gap-2">
              <DollarSign className="h-4 w-4" />
              Budget Planning
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}