import { Suspense } from "react";
import { SubscriptionForm } from "./SubscriptionForm";
import { SubscriptionsCount } from "./SubscriptionsCount";

export default function SubscriptionSection() {
  return (
    <>
      <SubscriptionForm />
      <Suspense fallback={null}>
        <SubscriptionsCount />
      </Suspense>
    </>
  );
}
