import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Truck, 
  Users, 
  MapPin, 
  AlertTriangle, 
  DollarSign, 
  TrendingUp,
  Activity
} from 'lucide-react';

export function DashboardOverview() {
  const metrics = [
    {
      title: 'Total Vehicles',
      value: '247',
      change: '+12 this month',
      icon: Truck,
      color: 'text-blue-600'
    },
    {
      title: 'Active Drivers',
      value: '189',
      change: '94% utilization',
      icon: Users,
      color: 'text-green-600'
    },
    {
      title: 'Active Trips',
      value: '156',
      change: '+23% from yesterday',
      icon: MapPin,
      color: 'text-orange-600'
    },
    {
      title: 'Maintenance Alerts',
      value: '8',
      change: '3 urgent',
      icon: AlertTriangle,
      color: 'text-red-600'
    },
    {
      title: 'Monthly Fuel Cost',
      value: '$47,832',
      change: '-8% vs last month',
      icon: DollarSign,
      color: 'text-purple-600'
    },
    {
      title: 'Fleet Efficiency',
      value: '87%',
      change: '+5% improvement',
      icon: TrendingUp,
      color: 'text-emerald-600'
    }
  ];

  const recentActivities = [
    { id: 1, type: 'trip_completed', vehicle: 'VH-0123', driver: 'John Smith', time: '2 min ago' },
    { id: 2, type: 'maintenance_due', vehicle: 'VH-0456', issue: 'Oil change required', time: '15 min ago' },
    { id: 3, type: 'fuel_alert', vehicle: 'VH-0789', alert: 'Low fuel warning', time: '32 min ago' },
    { id: 4, type: 'trip_started', vehicle: 'VH-0321', driver: 'Sarah Johnson', time: '1 hour ago' },
  ];

  const vehicleStatus = [
    { status: 'Active', count: 156, color: 'bg-green-500' },
    { status: 'Idle', count: 67, color: 'bg-yellow-500' },
    { status: 'Maintenance', count: 18, color: 'bg-red-500' },
    { status: 'Offline', count: 6, color: 'bg-gray-500' },
  ];

  return (
    <div className="p-6 space-y-6 overflow-auto h-full">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Fleet Dashboard</h2>
          <p className="text-muted-foreground">Monitor your fleet performance and status</p>
        </div>
        <Badge variant="outline" className="gap-1">
          <Activity className="h-3 w-3" />
          Static Data
        </Badge>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <Icon className={`h-4 w-4 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{metric.change}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vehicle Status */}
        <Card>
          <CardHeader>
            <CardTitle>Vehicle Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {vehicleStatus.map((status, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${status.color}`}></div>
                  <span className="text-sm">{status.status}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{status.count}</span>
                  <Progress 
                    value={(status.count / 247) * 100} 
                    className="w-16 h-2"
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{activity.vehicle}</span>
                      {activity.driver && (
                        <span className="text-sm text-muted-foreground">• {activity.driver}</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {activity.type === 'trip_completed' && 'Trip completed successfully'}
                      {activity.type === 'maintenance_due' && activity.issue}
                      {activity.type === 'fuel_alert' && activity.alert}
                      {activity.type === 'trip_started' && 'Started new trip'}
                    </p>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}