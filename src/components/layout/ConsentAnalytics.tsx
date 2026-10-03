import { useEffect } from "react";
import { useConsent } from "@/shared/hooks/useConsent";
import { disableAnalytics, enableAnalytics } from "@/shared/lib/analytics";

/** Liga ou desliga o Google Analytics conforme a escolha de consentimento. */
export function ConsentAnalytics() {
  const { choice } = useConsent();

  useEffect(() => {
    if (choice === "granted") {
      enableAnalytics();
    } else if (choice === "denied") {
      disableAnalytics();
    }
  }, [choice]);

  return null;
}
