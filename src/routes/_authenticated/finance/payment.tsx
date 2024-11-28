import PaymentChannelsPage from "@/features/authenticated/finance/components/payment";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/finance/payment")({
  component: PaymentUnderconstruction,
});

function PaymentUnderconstruction() {
  return (
    <div>
      <PaymentChannelsPage />
    </div>
  );
}
