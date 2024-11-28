import {
  PaymentBentoCard,
  PaymentBentoGrid,
} from "@/components/magicui/payment-grid";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "@phosphor-icons/react";
import { useRouter } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { CashierLocationDialog } from "./cashier-location";
import PaymentBankChannels from "./payment-bank-channel";
import PaymentGcashChannel from "./payment-gcash-channel";

interface PaymentChannel {
  type: "bank" | "online" | "remittance";
  name: string;
  accountName: string;
  accountNumber: string;
  instructions: string[];
}

interface PaymentChannelsData {
  cashierInfo: {
    hours: string;
    guidelines: string[];
  };
  channels: PaymentChannel[];
}

const features = [
  {
    Icon: "",
    name: "GCash",
    description: <span className="text-sm">Pay using GCash mobile wallet</span>,

    href: "/cashier",
    cta: "Pay with GCash",
    className: "md:col-span-1 lg:col-span-1 md:row-span-2 lg:row-span-2",
    background: (
      <PaymentGcashChannel className="absolute left-0 bottom-5 md:top-5 md:h-[250px] md:-right-3 border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
    ),
  },
  {
    Icon: "",
    name: "Bank Transfer",
    description: (
      <span className="text-sm">Transfer funds using your desired bank</span>
    ),
    className:
      "md:col-start-2 md:row-start-1 md:col-span-1 lg:col-span-1 lg:row-span-3",
    href: "/gcash",
    cta: "Pay with your preferred Bank",
    background: (
      <PaymentBankChannels className="absolute sm:-right-2 md:right-0 -top-5 h-[400px] w-[600px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
    ),
  },
  {
    Icon: "RemittanceIcon",
    name: "Remittance Centers",
    description: (
      <span className="text-sm">Send payments through remittance centers</span>
    ),
    className:
      "md:col-start-2 md:row-start-2 md:row-span-2 md:col-span-1 lg:col-span-1 lg:row-span-2 lg:row-start-1 lg:col-start-2",
    href: "/bank-transfer",
    cta: "Pay with Remittance Centers",
    background: "",
  },
  {
    Icon: "CashierIcon",
    name: <h1 className="text-primary-foreground">CJC Cashier's Office</h1>,
    description: (
      <span className="text-sm text-primary-foreground">
        Pay directly on weekdays from 8:00 AM to 5:00 PM.
      </span>
    ),
    className:
      "row-span-2 row-start-1 md:col-span-1 md:col-start-1 md:row-span-2 lg:col-span-2 lg:row-span-2 lg:row-start-3 bg-red-600 dark:bg-primary/20",
    href: "",
    cta: <CashierLocationDialog />,
    background: (
      <img
        className="absolute object-cover border-none h-full w-full transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105"
        src="https://i0.wp.com/www.cjc.edu.ph/wp-content/uploads/2023/04/3F-Deck-Roofing-View3-PP.png"
      />
    ),
  },
  {
    Icon: "PaymentChannelsIcon",
    name: "Other Payment Channels",
    description: (
      <span className="text-sm">Explore other payment options.</span>
    ),
    className:
      "md:col-span-1 md:col-start-2 md:row-start-4 lg:col-span-1 lg:row-span-1 lg:row-start-4 lg:col-start-3",
    href: "/payment-channels",
    cta: "More  ",
    background: "",
  },
];
const paymentAnimationConfig = {
  container: {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
        duration: 0.4,
        ease: "easeOut",
      },
    },
  },
};
function BentoDemo() {
  return (
    <AnimatePresence mode="sync">
      <PaymentBentoGrid
        variants={paymentAnimationConfig.container}
        className="h-full grid-cols-2 lg:grid-cols-3 auto-rows-fr lg:auto-rows-fr lg:grid-rows-4"
      >
        {features.map((feature, index) => (
          <PaymentBentoCard to={""} key={index} index={index} {...feature} />
        ))}
      </PaymentBentoGrid>
    </AnimatePresence>
  );
}

const MotionButton = motion(Button);
const PaymentChannelsPage: React.FC = () => {
  const router = useRouter();
  const onBack = () => router.history.back();
  return (
    <div className="flex flex-col gap-6 px-4 py-8 mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key="back-button"
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <MotionButton
            variants={{
              hidden: { opacity: 0, y: -10 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.3,
                  ease: "easeInOut",
                },
              },
            }}
            onClick={onBack}
            variant="ghost"
            className="inline-flex hover:text-primary"
          >
            <ArrowLeft className="mr-2 text-2xl" />
            Back
          </MotionButton>
        </motion.div>
      </AnimatePresence>
      <BentoDemo />
    </div>
  );
};

export default PaymentChannelsPage;
