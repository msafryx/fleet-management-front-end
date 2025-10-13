/**
 * Virtual Table Component
 * Performance optimization: Implements virtual scrolling for large datasets
 * Only renders visible rows, significantly improving performance for tables with 100+ items
 */

"use client";

import * as React from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { cn } from "./utils";

// Performance optimization: Memoized table container to prevent unnecessary re-renders
const VirtualTable = React.memo(({ 
  className, 
  children,
  ...props 
}: React.ComponentProps<"table"> & { children: React.ReactNode }) => {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      >
        {children}
      </table>
    </div>
  );
});
VirtualTable.displayName = "VirtualTable";

// Performance optimization: Virtualized table body that only renders visible rows
interface VirtualTableBodyProps<T> extends React.HTMLAttributes<HTMLTableSectionElement> {
  data: T[];
  renderRow: (item: T, index: number) => React.ReactNode;
  estimatedRowHeight?: number;
  overscan?: number;
}

function VirtualTableBody<T>({ 
  data, 
  renderRow, 
  estimatedRowHeight = 60,
  overscan = 5,
  className,
  ...props 
}: VirtualTableBodyProps<T>) {
  const parentRef = React.useRef<HTMLDivElement>(null);

  // Performance optimization: Virtual scrolling implementation
  // Only renders rows that are visible in the viewport
  const virtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimatedRowHeight,
    overscan: overscan, // Render extra rows above/below viewport for smooth scrolling
  });

  const virtualItems = virtualizer.getVirtualItems();

  return (
    <div 
      ref={parentRef} 
      className="max-h-[600px] overflow-auto"
      style={{ contain: 'strict' }} // Performance optimization: CSS containment
    >
      <table className="w-full caption-bottom text-sm">
        <tbody
          data-slot="table-body"
          className={cn("[&_tr:last-child]:border-0", className)}
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
          {...props}
        >
          {virtualItems.map((virtualRow) => (
            <tr
              key={virtualRow.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              {renderRow(data[virtualRow.index], virtualRow.index)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Regular table components (non-virtualized) for smaller datasets
function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  );
}

// Performance optimization: Memoized row component
const TableRow = React.memo(({ className, ...props }: React.ComponentProps<"tr">) => {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className
      )}
      {...props}
    />
  );
});
TableRow.displayName = "TableRow";

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-px",
        className
      )}
      {...props}
    />
  );
}

// Performance optimization: Memoized cell component
const TableCell = React.memo(({ className, ...props }: React.ComponentProps<"td">) => {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-px",
        className
      )}
      {...props}
    />
  );
});
TableCell.displayName = "TableCell";

function TableCaption({ className, ...props }: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-4 text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  VirtualTable as Table,
  VirtualTableBody,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};

