"use client";

import React, { forwardRef, useRef } from "react";

import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Student } from "@phosphor-icons/react";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
});

function PaymentGcashChannel({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const gcashRef = useRef<HTMLDivElement>(null);
  const corjesuRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={cn(
        "relative flex items-center w-full justify-center p-10 overflow-hidden rounded-lg",
        className
      )}
      ref={containerRef}
    >
      <div className="flex flex-row items-center justify-center w-full h-full gap-10">
        <Circle ref={userRef} className="shadow-none bg-card size-16">
          <Icons.user />
        </Circle>
        <Circle
          ref={gcashRef}
          className="border-none shadow-none bg-card size-16"
        >
          <Icons.gcash />
        </Circle>
        <Circle
          ref={corjesuRef}
          className="border-none shadow-none bg-card size-16"
        >
          <Icons.corjesu />
        </Circle>
      </div>

      <AnimatedBeam
        duration={3}
        containerRef={containerRef}
        fromRef={userRef}
        toRef={gcashRef}
        pathWidth={3}
        gradientStartColor="red"
        gradientStopColor="red"
      />
      <AnimatedBeam
        duration={3}
        containerRef={containerRef}
        fromRef={gcashRef}
        toRef={corjesuRef}
        pathWidth={3}
        gradientStartColor="red"
        gradientStopColor="red"
      />
    </div>
  );
}

const Icons = {
  gcash: () => (
    <Avatar className="w-16 p-px h-14">
      <AvatarImage
        src="/public/gcash.png"
        className="dark:brightness-0 dark:contrast-100 dark:invert"
      />
      <AvatarFallback>LNDBK</AvatarFallback>
    </Avatar>
  ),
  user: () => <Student className="size-36" />,
  corjesu: () => (
    <Avatar className="size-14">
      <AvatarImage src="/public/cjc.png" />
      <AvatarFallback>CJC</AvatarFallback>
    </Avatar>
  ),
};

export default PaymentGcashChannel;
