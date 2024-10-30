import { getSubscriptionsCount } from "@/lib/subscription-actions";
import NumberTicker from "../ui/number-ticker";

export async function SubscriptionsCount() {
  const count = await getSubscriptionsCount();
  if (count) {
    return (
      <p className="text-center text-sm my-2">
        Join our community of{" "}
        <span className="font-medium">
          <NumberTicker value={count + 100} /> AI experts!
        </span>
      </p>
    );
  }

  return null;
}
