import { Suspense } from "react";
import { SubscriptionForm } from "./SubscriptionForm";
import { SubscriptionsCount } from "./SubscriptionsCount";

export default function SubscriptionSection() {
  return (
    <div className="my-4">
      <SubscriptionForm />
      <Suspense fallback={null}>
        <SubscriptionsCount />
      </Suspense>
    </div>
  );
}
