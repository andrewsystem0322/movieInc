import {Dispatch, SetStateAction, useState} from 'react';

const useHandleLoadingScreen = (): {
  handleLoadingScreen: () => void;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
} => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadingScreen = (): void => {
    setIsLoading(!isLoading);
  };

  return {handleLoadingScreen, isLoading, setIsLoading};
};

export {useHandleLoadingScreen};
