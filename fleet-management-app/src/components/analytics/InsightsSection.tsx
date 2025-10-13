// Performance optimization: Added React.memo and useMemo for expensive calculations
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { topPerformingDrivers, costSavings, upcomingMilestones } from '../constants/mockData';

// Performance optimization: Memoized component prevents re-renders when parent updates
export const InsightsSection = React.memo(function InsightsSection() {
  // Performance optimization: Memoize expensive calculation
  const totalSavings = useMemo(() => 
    costSavings.reduce((sum, item) => sum + item.amount, 0),
    [costSavings]
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Drivers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {topPerformingDrivers.map((driver, index) => (
            <div key={index} className="flex items-center justify-between p-2 border rounded">
              <div>
                <p className="font-medium">{driver.name}</p>
                <p className="text-sm text-muted-foreground">{driver.trips} trips</p>
              </div>
              <Badge variant="secondary">{driver.score}%</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cost Savings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">${totalSavings.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Saved this quarter</p>
          </div>
          <div className="space-y-2 text-sm">
            {costSavings.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span>{item.label}</span>
                <span className="text-green-600">${item.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Milestones</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {upcomingMilestones.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{item.milestone}</span>
                <span className="text-muted-foreground">{item.target}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${item.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
});