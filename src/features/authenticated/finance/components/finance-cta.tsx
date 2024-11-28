import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { BookOpen, CreditCard } from "@phosphor-icons/react";

export function FinanceCta() {
  return (
    <BentoGrid className="lg:grid-cols-2 auto-rows-[11rem]">
      <BentoCard
        name="Payment"
        className="col-span-1"
        background={
          <div className="h-full bg-gradient-to-br from-blue-100 to-blue-200" />
        }
        Icon={CreditCard}
        description={<p className="text-sm">Make a payment for your account</p>}
        to="/finance/payment"
        cta="Pay Now"
      />
      <BentoCard
        name="Ledger"
        className="col-span-1"
        background={
          <div className="h-full bg-gradient-to-br from-green-100 to-green-200" />
        }
        Icon={BookOpen}
        description={<p className="text-sm">Review your transaction history</p>}
        to="/finance/ledger"
        cta="Open Ledger"
      />
    </BentoGrid>
  );
}
