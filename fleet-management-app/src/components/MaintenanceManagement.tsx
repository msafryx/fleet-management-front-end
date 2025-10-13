// Performance optimization: Added useMemo for expensive calculations
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Plus, 
  Calendar, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Wrench,
  DollarSign,
  FileText
} from 'lucide-react';

export function MaintenanceManagement() {
  const maintenanceItems = [
    {
      id: 'M001',
      vehicle: 'VH-0123',
      type: 'Oil Change',
      status: 'overdue',
      dueDate: '2024-02-20',
      currentMileage: 45230,
      dueMileage: 45000,
      cost: 150,
      priority: 'high',
      assignedTo: 'Service Center A'
    },
    {
      id: 'M002',
      vehicle: 'VH-0456',
      type: 'Brake Inspection',
      status: 'in_progress',
      dueDate: '2024-02-28',
      currentMileage: 67890,
      dueMileage: 68000,
      cost: 300,
      priority: 'medium',
      assignedTo: 'Service Center B'
    },
    {
      id: 'M003',
      vehicle: 'VH-0789',
      type: 'Tire Rotation',
      status: 'scheduled',
      dueDate: '2024-03-05',
      currentMileage: 23456,
      dueMileage: 25000,
      cost: 80,
      priority: 'low',
      assignedTo: 'Service Center A'
    },
    {
      id: 'M004',
      vehicle: 'VH-0321',
      type: 'Annual Inspection',
      status: 'due_soon',
      dueDate: '2024-02-25',
      currentMileage: 89123,
      dueMileage: 90000,
      cost: 500,
      priority: 'high',
      assignedTo: 'Service Center C'
    },
    {
      id: 'M005',
      vehicle: 'VH-0567',
      type: 'Engine Tune-up',
      status: 'completed',
      dueDate: '2024-02-15',
      currentMileage: 156000,
      dueMileage: 155000,
      cost: 750,
      priority: 'medium',
      assignedTo: 'Service Center B'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      overdue: { label: 'Overdue', variant: 'destructive' as const, icon: AlertTriangle },
      due_soon: { label: 'Due Soon', variant: 'secondary' as const, icon: Clock },
      scheduled: { label: 'Scheduled', variant: 'outline' as const, icon: Calendar },
      in_progress: { label: 'In Progress', variant: 'default' as const, icon: Wrench },
      completed: { label: 'Completed', variant: 'secondary' as const, icon: CheckCircle }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.scheduled;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getMileageProgress = (current: number, due: number) => {
    return Math.min((current / due) * 100, 100);
  };

  // Performance optimization: Memoize expensive calculations
  // Only recalculate when maintenanceItems changes
  const upcomingCount = useMemo(() => 
    maintenanceItems.filter(item => 
      item.status === 'due_soon' || item.status === 'overdue'
    ).length,
    [maintenanceItems]
  );

  const inProgressCount = useMemo(() => 
    maintenanceItems.filter(item => 
      item.status === 'in_progress'
    ).length,
    [maintenanceItems]
  );

  const totalCost = useMemo(() => 
    maintenanceItems
      .filter(item => item.status === 'scheduled' || item.status === 'in_progress')
      .reduce((sum, item) => sum + item.cost, 0),
    [maintenanceItems]
  );

  return (
    <div className="p-6 space-y-6 overflow-auto h-full">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Maintenance Management</h2>
          <p className="text-muted-foreground">Track and manage vehicle maintenance schedules</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Schedule Maintenance
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Maintenance</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingCount}</div>
            <p className="text-xs text-muted-foreground">Items due soon or overdue</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Wrench className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressCount}</div>
            <p className="text-xs text-muted-foreground">Currently being serviced</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled Costs</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalCost.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Upcoming maintenance budget</p>
          </CardContent>
        </Card>
      </div>

      {/* Maintenance Items */}
      <div className="space-y-4">
        {maintenanceItems.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div>
                    <CardTitle className="text-lg">{item.type}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {item.vehicle} • {item.id}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {getStatusBadge(item.status)}
                    <Badge variant="outline" className={getPriorityColor(item.priority)}>
                      {item.priority} Priority
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${item.cost}</p>
                  <p className="text-sm text-muted-foreground">Estimated Cost</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Due Date:</span>
                  <p className="font-medium">{item.dueDate}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Assigned To:</span>
                  <p className="font-medium">{item.assignedTo}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Current Mileage:</span>
                  <p className="font-medium">{item.currentMileage.toLocaleString()} km</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Mileage Progress</span>
                  <span>{item.currentMileage.toLocaleString()} / {item.dueMileage.toLocaleString()} km</span>
                </div>
                <Progress 
                  value={getMileageProgress(item.currentMileage, item.dueMileage)} 
                  className="h-2"
                />
              </div>

              <div className="flex gap-2 pt-2 border-t">
                {item.status === 'scheduled' && (
                  <Button variant="outline" size="sm">
                    Reschedule
                  </Button>
                )}
                {item.status === 'overdue' && (
                  <Button size="sm">
                    Schedule Now
                  </Button>
                )}
                {item.status === 'in_progress' && (
                  <Button variant="outline" size="sm">
                    Update Status
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}