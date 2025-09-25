import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { Global } from "@emotion/react";
import { globalNeonStyles } from "../theme";

interface NeonModeContextValue {
  neon: boolean;
  toggleNeon: () => void;
  enableNeon: () => void;
  disableNeon: () => void;
}

const NeonModeContext = createContext<NeonModeContextValue | undefined>(
  undefined
);

export const NeonModeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [neon, setNeon] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem("tecsoqr:neon");
      return stored ? stored === "1" : false;
    } catch {
      return false;
    }
  });

  const persist = (value: boolean) => {
    try {
      localStorage.setItem("tecsoqr:neon", value ? "1" : "0");
    } catch {
      /* ignore persistence errors (private mode) */
    }
  };

  const toggleNeon = useCallback(() => {
    setNeon((prev) => {
      const next = !prev;
      persist(next);
      return next;
    });
  }, []);
  const enableNeon = useCallback(() => {
    setNeon(true);
    persist(true);
  }, []);
  const disableNeon = useCallback(() => {
    setNeon(false);
    persist(false);
  }, []);

  useEffect(() => {
    if (neon) document.documentElement.classList.add("neon-active");
    else document.documentElement.classList.remove("neon-active");
  }, [neon]);

  return (
    <NeonModeContext.Provider
      value={{ neon, toggleNeon, enableNeon, disableNeon }}
    >
      <Global styles={globalNeonStyles} />
      {children}
    </NeonModeContext.Provider>
  );
};

// Hook to access neon mode
export const useNeonMode = () => {
  const ctx = useContext(NeonModeContext);
  if (!ctx) throw new Error("useNeonMode must be used within NeonModeProvider");
  return ctx;
};
