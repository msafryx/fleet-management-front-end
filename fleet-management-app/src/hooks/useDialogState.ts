/**
 * Custom hook for managing dialog/modal state
 * 
 * This hook provides a consistent way to handle dialog open/close state
 * and associated data across the application.
 */

import { useState, useCallback } from 'react';

export function useDialogState<T = undefined>() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<T | undefined>(undefined);

  const openDialog = useCallback((dialogData?: T) => {
    setData(dialogData);
    setIsOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setIsOpen(false);
    // Delay clearing data to allow closing animation
    setTimeout(() => setData(undefined), 200);
  }, []);

  const toggleDialog = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return {
    isOpen,
    data,
    openDialog,
    closeDialog,
    toggleDialog
  };
}

