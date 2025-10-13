// Performance optimization: Added React.memo to prevent unnecessary re-renders
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fuelConsumptionData } from '../constants/mockData';

// Performance optimization: Memoized component prevents re-renders when parent updates
// Only re-renders when props or data changes
export const FuelConsumptionChart = React.memo(function FuelConsumptionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Fuel Consumption Trend</CardTitle>
        <Badge variant="outline">Last 6 Months</Badge>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={fuelConsumptionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="consumption" 
              stroke="#3b82f6" 
              strokeWidth={2}
              name="Consumption (L)"
              // Performance optimization: Disable animation on re-render for better performance
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
});