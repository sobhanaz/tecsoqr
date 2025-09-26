import { createContext } from "react";

export interface NeonModeContextValue {
  neon: boolean;
  toggleNeon: () => void;
  enableNeon: () => void;
  disableNeon: () => void;
}

export const NeonModeContext = createContext<NeonModeContextValue | undefined>(
  undefined
);
