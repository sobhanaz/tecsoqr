import { createContext } from "react";

export type Plan = "free" | "pro" | "enterprise";

export type Features = {
  api: boolean;
  analytics: boolean;
  prioritySupport: boolean;
  branding: boolean;
  bulkGeneration: boolean;
  teamCollaboration: boolean;
};

export type SubscriptionState = {
  plan: Plan;
  setPlan: (plan: Plan) => void;
  features: Features;
  hasFeature: (key: keyof Features) => boolean;
};

export const defaultFeaturesByPlan: Record<Plan, Features> = {
  free: {
    api: false,
    analytics: false,
    prioritySupport: false,
    branding: false,
    bulkGeneration: false,
    teamCollaboration: false,
  },
  pro: {
    api: true,
    analytics: true,
    prioritySupport: true,
    branding: true,
    bulkGeneration: true,
    teamCollaboration: false,
  },
  enterprise: {
    api: true,
    analytics: true,
    prioritySupport: true,
    branding: true,
    bulkGeneration: true,
    teamCollaboration: true,
  },
};

export const STORAGE_KEY = "tecsoqr.plan";

export const SubscriptionContext = createContext<SubscriptionState | undefined>(
  undefined
);
