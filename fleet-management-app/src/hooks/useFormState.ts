/**
 * Custom hook for managing form state
 * 
 * This hook provides a consistent way to handle form state across the application,
 * reducing code duplication and improving maintainability.
 */

import { useState, useCallback } from 'react';

export function useFormState<T extends Record<string, unknown>>(
  initialState: T
) {
  const [formState, setFormState] = useState<T>(initialState);

  const updateField = useCallback((field: keyof T, value: unknown) => {
    setFormState(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const updateFields = useCallback((updates: Partial<T>) => {
    setFormState(prev => ({
      ...prev,
      ...updates
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormState(initialState);
  }, [initialState]);

  const setForm = useCallback((newState: T) => {
    setFormState(newState);
  }, []);

  return {
    formState,
    updateField,
    updateFields,
    resetForm,
    setForm
  };
}

