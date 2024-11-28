import { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { motion, Variants } from "framer-motion";

const PaymentBentoGrid = ({
  children,
  className,
  variants,
}: {
  children: ReactNode;
  className?: string;
  variants?: Variants;
}) => {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

const PaymentBentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  to,
  cta,
  index,
}: {
  name: string | ReactNode;
  className: string;
  background: ReactNode;
  Icon: any;
  description: string | ReactNode | null;
  to?: string;
  cta: string | ReactNode;
  index: number;
}) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: -10 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.3,
          ease: "easeInOut",
          delayChildren: index * 1,
          staggerChildren: 0.1,
        },
      },
    }}
    key={name?.toString()}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
      // light styles
      "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
      // dark styles
      "dark:bg-card dark:text-primary-foreground",
      // transform-gpu dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]
      className
    )}
  >
    <div>{background}</div>
    <div
      className={cn(
        "z-10 flex flex-col gap-1 p-6 transition-all duration-300 pointer-events-none transform-gpu",
        description !== null
          ? "group-hover:-translate-y-7"
          : "group-hover:-translate-y-5"
      )}
    >
      {Icon && (
        <Icon className="w-8 h-8 transition-all duration-300 ease-in-out origin-left transform-gpu text-neutral-400 group-hover:scale-75" />
      )}
      <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
        {name}
      </h3>
      <p className="max-w-lg text-neutral-400">{description}</p>
    </div>

    <div
      className={cn(
        "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
      )}
    >
      <Button
        variant="link"
        asChild
        size="sm"
        className="-ml-1 pointer-events-auto"
      >
        <Link to={to}>{cta}</Link>
      </Button>
    </div>
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
  </motion.div>
);

export { PaymentBentoCard, PaymentBentoGrid };
