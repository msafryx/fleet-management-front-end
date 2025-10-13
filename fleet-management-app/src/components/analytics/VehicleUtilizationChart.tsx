// Performance optimization: Added React.memo to prevent unnecessary re-renders
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { vehicleUtilizationData } from '../constants/mockData';

// Performance optimization: Memoized component prevents re-renders when parent updates
// Only re-renders when props or data changes
export const VehicleUtilizationChart = React.memo(function VehicleUtilizationChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vehicle Utilization</CardTitle>
        <Badge variant="outline">Current Status</Badge>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={vehicleUtilizationData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              // Performance optimization: Disable animation on re-render for better performance
              isAnimationActive={false}
            >
              {vehicleUtilizationData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
});