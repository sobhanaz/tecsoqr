import { useContext } from "react";
import { NeonModeContext } from "./NeonModeContext";

export const useNeonMode = () => {
  const ctx = useContext(NeonModeContext);
  if (!ctx) throw new Error("useNeonMode must be used within NeonModeProvider");
  return ctx;
};
