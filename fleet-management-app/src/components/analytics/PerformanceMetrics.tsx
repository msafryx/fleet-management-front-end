// Performance optimization: Added React.memo to prevent unnecessary re-renders
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { performanceMetrics } from '../constants/mockData';

// Performance optimization: Memoized component prevents re-renders when parent updates
export const PerformanceMetrics = React.memo(function PerformanceMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {performanceMetrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.metric}</CardTitle>
            {metric.trend === 'up' ? (
              <TrendingUp className="h-4 w-4 text-green-600" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-600" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <div className={`flex items-center gap-1 text-xs ${
              metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              <span>{metric.change} from last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
});