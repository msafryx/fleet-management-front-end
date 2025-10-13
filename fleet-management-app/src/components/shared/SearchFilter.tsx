/**
 * SearchFilter Component
 * 
 * Reusable search and filter component used across multiple pages
 * for consistent filtering UI and behavior.
 */

import React from 'react';
import { Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export interface FilterOption {
  value: string;
  label: string;
}

interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchPlaceholder?: string;
  filters?: {
    value: string;
    onValueChange: (value: string) => void;
    options: FilterOption[];
    placeholder?: string;
    width?: string;
  }[];
  className?: string;
}

export const SearchFilter = React.memo<SearchFilterProps>(function SearchFilter({
  searchQuery,
  onSearchChange,
  searchPlaceholder = 'Search...',
  filters = [],
  className = ''
}) {
  return (
    <Card className={className}>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          {filters.map((filter, index) => (
            <Select 
              key={index}
              value={filter.value} 
              onValueChange={filter.onValueChange}
            >
              <SelectTrigger className={filter.width || 'w-48'}>
                <SelectValue placeholder={filter.placeholder || 'Filter'} />
              </SelectTrigger>
              <SelectContent>
                {filter.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}
        </div>
      </CardContent>
    </Card>
  );
});

