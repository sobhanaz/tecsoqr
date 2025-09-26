import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  STORAGE_KEY,
  SubscriptionContext,
  type SubscriptionState,
  defaultFeaturesByPlan,
  type Plan,
  type Features,
} from "./subscription-base";

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [plan, setPlanState] = useState<Plan>(() => {
    const fromStorage = (typeof window !== "undefined" &&
      window.localStorage.getItem(STORAGE_KEY)) as Plan | null;
    if (
      fromStorage === "free" ||
      fromStorage === "pro" ||
      fromStorage === "enterprise"
    )
      return fromStorage;
    return "free";
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, plan);
    } catch (e) {
      // Non-fatal: storage might be unavailable (private mode, etc.)
      console.warn("Unable to persist plan to localStorage", e);
    }
  }, [plan]);

  const setPlan = useCallback((next: Plan) => setPlanState(next), []);

  const features = useMemo(() => defaultFeaturesByPlan[plan], [plan]);
  const hasFeature = useCallback(
    (key: keyof Features) => !!features[key],
    [features]
  );

  const value = useMemo<SubscriptionState>(
    () => ({ plan, setPlan, features, hasFeature }),
    [plan, setPlan, features, hasFeature]
  );

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};
