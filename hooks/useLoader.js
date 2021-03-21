import React, { useContext } from 'react';

export const LoadingContext = React.createContext();

function useLoader() {
  const { isLoading, setIsLoading } = useContext(LoadingContext);

  return {
    showLoader: () => { setIsLoading(true); },
    hideLoader: () => { setIsLoading(false); },
    isLoading,
  };
}

export default useLoader;
