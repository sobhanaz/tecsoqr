import { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => void;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export const PWAInstall = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [canInstall, setCanInstall] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      const bip = e as BeforeInstallPromptEvent;
      e.preventDefault();
      setDeferredPrompt(bip);
      setCanInstall(true);
    };
    window.addEventListener("beforeinstallprompt", handler as EventListener);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const onInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome) {
      setDeferredPrompt(null);
      setCanInstall(false);
    }
  };

  if (!canInstall) return null;
  return (
    <Button size="sm" onClick={onInstall} variant="outline">
      Install App
    </Button>
  );
};
