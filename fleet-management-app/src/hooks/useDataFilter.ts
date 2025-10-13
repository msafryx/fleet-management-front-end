/**
 * Custom hook for filtering and searching data
 * 
 * This hook provides a reusable way to filter arrays of data based on
 * search queries and filter criteria, with proper memoization for performance.
 */

import { useMemo } from 'react';

export interface FilterConfig<T> {
  data: T[];
  searchQuery: string;
  searchFields: (keyof T)[];
  filters?: Record<string, string>;
  filterFunctions?: Record<string, (item: T, value: string) => boolean>;
}

export function useDataFilter<T extends Record<string, unknown>>({
  data,
  searchQuery,
  searchFields,
  filters = {},
  filterFunctions = {}
}: FilterConfig<T>) {
  const filteredData = useMemo(() => {
    return data.filter(item => {
      // Apply search query
      const matchesSearch = !searchQuery || searchFields.some(field => {
        const value = item[field];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchQuery.toLowerCase());
        }
        if (typeof value === 'number') {
          return value.toString().includes(searchQuery);
        }
        return false;
      });

      // Apply additional filters
      const matchesFilters = Object.entries(filters).every(([filterKey, filterValue]) => {
        if (!filterValue || filterValue === 'all') return true;
        
        // Use custom filter function if provided
        if (filterFunctions[filterKey]) {
          return filterFunctions[filterKey](item, filterValue);
        }
        
        // Default equality check
        return item[filterKey as keyof T] === filterValue;
      });

      return matchesSearch && matchesFilters;
    });
  }, [data, searchQuery, searchFields, filters, filterFunctions]);

  return filteredData;
}

