// Performance optimization: Added React.memo to prevent unnecessary re-renders
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { maintenanceCostsData } from '../constants/mockData';

// Performance optimization: Memoized component prevents re-renders when parent updates
// Only re-renders when props or data changes
export const MaintenanceCostsChart = React.memo(function MaintenanceCostsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Maintenance Costs Breakdown</CardTitle>
        <Badge variant="outline">Scheduled vs Emergency</Badge>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={maintenanceCostsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar 
              dataKey="scheduled" 
              fill="#10b981" 
              name="Scheduled Maintenance"
              // Performance optimization: Disable animation on re-render for better performance
              isAnimationActive={false}
            />
            <Bar 
              dataKey="emergency" 
              fill="#ef4444" 
              name="Emergency Repairs"
              // Performance optimization: Disable animation on re-render for better performance
              isAnimationActive={false}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
});