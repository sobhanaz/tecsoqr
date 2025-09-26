import { useContext } from "react";
import {
  SubscriptionContext,
  type SubscriptionState,
} from "@/context/subscription-base";

export const useSubscription = (): SubscriptionState => {
  const ctx = useContext(SubscriptionContext);
  if (!ctx)
    throw new Error("useSubscription must be used within SubscriptionProvider");
  return ctx;
};
