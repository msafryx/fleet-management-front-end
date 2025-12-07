import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { formService, driverService } from '@/services/api';
import type { PerformanceTrends, Driver } from '@/types';
import { TrendingUp, Search, AlertCircle, BarChart3, Fuel, Clock, Award, Loader2 } from 'lucide-react';

export function PerformanceTrendsChart() {
  const [driverId, setDriverId] = useState('');
  const [limit, setLimit] = useState('10');
  const [trends, setTrends] = useState<PerformanceTrends | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [isLoadingDrivers, setIsLoadingDrivers] = useState(false);

  useEffect(() => {
    const fetchDrivers = async () => {
      setIsLoadingDrivers(true);
      try {
        const response = await driverService.getAll();
        if (response.success && response.data) {
          setDrivers(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch drivers:', error);
      } finally {
        setIsLoadingDrivers(false);
      }
    };
    fetchDrivers();
  }, []);

  const handleFetchTrends = async () => {
    if (!driverId) {
      setError('Please enter a driver ID');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const limitNum = parseInt(limit) || 10;
      const response = await formService.getPerformanceTrends(parseInt(driverId), limitNum);

      if (response.success && response.data) {
        setTrends(response.data);
      } else {
        setError(response.error || 'Failed to fetch performance trends');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Error fetching trends:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getMaxValue = (values: number[]) => {
    return Math.max(...values, 0);
  };

  const renderBarChart = (values: number[], label: string, color: string, maxValue: number) => {
    return (
      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-muted-foreground">{label}</h4>
        <div className="space-y-1">
          {values.map((value, index) => {
            const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
            return (
              <div key={index} className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground w-6">{index + 1}</span>
                <div className="flex-1 h-6 bg-gray-100 rounded-md overflow-hidden relative">
                  <div
                    className={`h-full ${color} transition-all duration-300`}
                    style={{ width: `${percentage}%` }}
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-medium">
                    {value.toFixed(2)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          Performance Trends Visualization
        </CardTitle>
        <CardDescription>
          View historical performance metrics and trends for a specific driver
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="trendDriverId">Select Driver *</Label>
            <Select
              value={driverId}
              onValueChange={setDriverId}
              disabled={isLoadingDrivers}
            >
              <SelectTrigger id="trendDriverId">
                <SelectValue placeholder={isLoadingDrivers ? "Loading drivers..." : "Select a driver"} />
              </SelectTrigger>
              <SelectContent>
                {drivers.map((driver) => {
                  const value = driver.id || driver.driverId?.toString();
                  if (!value) return null;
                  return (
                    <SelectItem key={value} value={value}>
                      {driver.name || driver.fullName || `Driver #${value}`}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="limit">Number of Records</Label>
            <Input
              id="limit"
              type="number"
              placeholder="Default: 10"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              min="1"
              max="50"
            />
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button 
          onClick={handleFetchTrends} 
          disabled={isLoading || !driverId}
          className="w-full gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading...
            </>
          ) : (
            <>
              <Search className="h-4 w-4" />
              Fetch Performance Trends
            </>
          )}
        </Button>

        {trends && !isLoading && (
          <div className="space-y-6">
            {trends.totalForms === 0 ? (
              <Alert>
                <BarChart3 className="h-4 w-4" />
                <AlertDescription>
                  No performance data found for this driver.
                </AlertDescription>
              </Alert>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border-blue-200 bg-blue-50">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="h-5 w-5 text-blue-600" />
                        <span className="text-sm font-medium text-blue-900">Average Score</span>
                      </div>
                      <div className="text-3xl font-bold text-blue-900">
                        {trends.averages.score.toFixed(2)}
                      </div>
                      <Badge variant="outline" className="mt-2 text-xs">
                        {trends.totalForms} forms
                      </Badge>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200 bg-green-50">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Fuel className="h-5 w-5 text-green-600" />
                        <span className="text-sm font-medium text-green-900">Fuel Efficiency</span>
                      </div>
                      <div className="text-3xl font-bold text-green-900">
                        {trends.averages.fuelEfficiency.toFixed(2)}
                      </div>
                      <Badge variant="outline" className="mt-2 text-xs">
                        km/L average
                      </Badge>
                    </CardContent>
                  </Card>

                  <Card className="border-purple-200 bg-purple-50">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-5 w-5 text-purple-600" />
                        <span className="text-sm font-medium text-purple-900">On-Time Rate</span>
                      </div>
                      <div className="text-3xl font-bold text-purple-900">
                        {trends.averages.onTimeRate.toFixed(2)}%
                      </div>
                      <Badge variant="outline" className="mt-2 text-xs">
                        Punctuality
                      </Badge>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Performance Trends</CardTitle>
                    <CardDescription>
                      Showing last {trends.totalForms} performance record{trends.totalForms !== 1 ? 's' : ''}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {renderBarChart(
                      trends.scores,
                      'Performance Scores',
                      'bg-blue-500',
                      getMaxValue(trends.scores)
                    )}

                    {renderBarChart(
                      trends.fuelEfficiencies,
                      'Fuel Efficiency (km/L)',
                      'bg-green-500',
                      getMaxValue(trends.fuelEfficiencies)
                    )}

                    {renderBarChart(
                      trends.onTimeRates,
                      'On-Time Rate (%)',
                      'bg-purple-500',
                      100 // On-time rate is a percentage, max is 100
                    )}
                  </CardContent>
                </Card>

                <div className="text-xs text-muted-foreground text-center">
                  Data represents the most recent {trends.totalForms} performance form{trends.totalForms !== 1 ? 's' : ''} submitted
                </div>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

