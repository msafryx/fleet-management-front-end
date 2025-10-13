/**
 * Data Helper Utilities
 * 
 * Common utilities for data manipulation, filtering, sorting, and formatting
 */

import type { SortOrder, SortOptions } from '@/types';

// ============================================================================
// SORTING UTILITIES
// ============================================================================

export function sortData<T>(
  data: T[],
  sortOptions: SortOptions<keyof T>
): T[] {
  const { field, order } = sortOptions;

  return [...data].sort((a, b) => {
    const aValue = a[field];
    const bValue = b[field];

    // Handle undefined/null values
    if (aValue == null) return 1;
    if (bValue == null) return -1;

    // Compare values based on type
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return order === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return order === 'asc' ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });
}

// ============================================================================
// PAGINATION UTILITIES
// ============================================================================

export interface PaginationResult<T> {
  data: T[];
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export function paginateData<T>(
  data: T[],
  page: number,
  pageSize: number
): PaginationResult<T> {
  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = data.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    totalPages,
    currentPage: page,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1
  };
}

// ============================================================================
// SEARCH UTILITIES
// ============================================================================

export function searchInFields<T extends Record<string, unknown>>(
  item: T,
  query: string,
  fields: (keyof T)[]
): boolean {
  if (!query) return true;

  const lowerQuery = query.toLowerCase();

  return fields.some(field => {
    const value = item[field];
    if (value == null) return false;

    if (typeof value === 'string') {
      return value.toLowerCase().includes(lowerQuery);
    }

    if (typeof value === 'number') {
      return value.toString().includes(query);
    }

    return false;
  });
}

// ============================================================================
// FORMATTING UTILITIES
// ============================================================================

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(amount);
}

export function formatNumber(value: number, decimals: number = 0): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
}

export function formatPercentage(value: number, decimals: number = 1): string {
  return `${formatNumber(value, decimals)}%`;
}

export function formatDate(date: string | Date, format: 'short' | 'long' = 'short'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (format === 'long') {
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  return dateObj.toLocaleDateString('en-US');
}

export function formatTime(time: string): string {
  // Assumes time is in format like "08:30 AM"
  return time;
}

export function formatDistance(km: number): string {
  return `${formatNumber(km, 1)} km`;
}

// ============================================================================
// CALCULATION UTILITIES
// ============================================================================

export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return (value / total) * 100;
}

export function calculateAverage(values: number[]): number {
  if (values.length === 0) return 0;
  const sum = values.reduce((acc, val) => acc + val, 0);
  return sum / values.length;
}

export function calculateSum(values: number[]): number {
  return values.reduce((acc, val) => acc + val, 0);
}

// ============================================================================
// GROUPING UTILITIES
// ============================================================================

export function groupBy<T>(
  array: T[],
  key: keyof T
): Record<string, T[]> {
  return array.reduce((result, item) => {
    const groupKey = String(item[key]);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, T[]>);
}

// ============================================================================
// VALIDATION UTILITIES
// ============================================================================

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// ============================================================================
// DEBOUNCE UTILITY
// ============================================================================

export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

