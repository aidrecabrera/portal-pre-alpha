import { MotionGlobalConfig } from "framer-motion";
import React, { createContext, useContext, useEffect, useState } from "react";

type MotionProviderProps = {
  children: React.ReactNode;
  defaultEnabled?: boolean;
  storageKey?: string;
};

type MotionProviderState = {
  isMotionEnabled: boolean;
  setIsMotionEnabled: (enabled: boolean) => void;
};

const initialState: MotionProviderState = {
  isMotionEnabled: true,
  setIsMotionEnabled: () => null,
};

const MotionProviderContext = createContext<MotionProviderState>(initialState);

export function MotionProvider({
  children,
  defaultEnabled = true,
  storageKey = "vite-ui-animation",
  ...props
}: MotionProviderProps) {
  const [isMotionEnabled, setIsMotionEnabled] = useState<boolean>(() => {
    const stored = localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : defaultEnabled;
  });

  useEffect(() => {
    MotionGlobalConfig.skipAnimations = !isMotionEnabled;
  }, [isMotionEnabled]);

  const value = {
    isMotionEnabled,
    setIsMotionEnabled: (enabled: boolean) => {
      localStorage.setItem(storageKey, JSON.stringify(enabled));
      setIsMotionEnabled(enabled);
    },
  };

  return (
    <MotionProviderContext.Provider {...props} value={value}>
      {children}
    </MotionProviderContext.Provider>
  );
}

export const useMotion = () => {
  const context = useContext(MotionProviderContext);

  if (context === undefined)
    throw new Error("useMotion must be used within an MotionProvider");

  return context;
};
