"use client"

import React, { createContext, useContext, useEffect, useState } from 'react';
import LoadingScreen from './loading-page';

interface LoadingContextType {
  loadingCount: number;
  incrementLoading: () => void;
  decrementLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | null>(null);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

interface Props {
  children?: React.ReactNode;
}

export const LoadingProvider: React.FC<Props> = ({ children }) => {
  const [loadingCount, setLoadingCount] = useState(0);

  const incrementLoading = () => {
    setLoadingCount((prevCount) => prevCount + 1);
    
  };

  const decrementLoading = () => {
    setLoadingCount((prevCount) => prevCount - 1);
  };

  useEffect(() => {
    console.log(loadingCount)
  }, [loadingCount])

  return (
    <LoadingContext.Provider value={{ loadingCount, incrementLoading, decrementLoading }}>
      {children}
    </LoadingContext.Provider>
  )
}