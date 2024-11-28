import React, { forwardRef, useRef } from "react";

import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Student } from "@phosphor-icons/react";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-2 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

function PaymentBankChannels({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const metrobankRef = useRef<HTMLDivElement>(null);
  const bdoRef = useRef<HTMLDivElement>(null);
  const landbankRef = useRef<HTMLDivElement>(null);
  const corjesuRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={cn(
        "relative flex h-[300px] max-w-full items-center justify-center overflow-hidden rounded-lg border bg-background p-10",
        className
      )}
      ref={containerRef}
    >
      <div className="flex flex-row items-stretch justify-between max-w-lg gap-4 size-full">
        <div className="flex flex-col justify-center">
          <Circle ref={userRef} className="shadow-none bg-card size-16">
            <Icons.user />
          </Circle>
        </div>
        <div className="flex flex-col justify-between">
          <Circle
            ref={metrobankRef}
            className="bg-transparent border-none shadow-none"
          >
            <Icons.metrobank />
          </Circle>
          <Circle ref={bdoRef} className="border-none shadow-none bg-card">
            <Icons.bdo />
          </Circle>
          <Circle ref={landbankRef}>
            <Circle
              ref={corjesuRef}
              className="bg-transparent border-none shadow-none"
            >
              <Icons.landbank />
            </Circle>
          </Circle>
        </div>
        <div className="flex flex-col justify-center">
          <Circle
            ref={corjesuRef}
            className="bg-transparent border-none shadow-none"
          >
            <Icons.corjesu />
          </Circle>
        </div>
      </div>

      {/* AnimatedBeams from user to banks */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={userRef}
        toRef={metrobankRef}
        pathWidth={2.5}
        gradientStartColor="red"
        gradientStopColor="red"
        curvature={0}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={userRef}
        toRef={bdoRef}
        pathWidth={2.5}
        gradientStartColor="red"
        gradientStopColor="red"
        curvature={0}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={userRef}
        toRef={landbankRef}
        pathWidth={2.5}
        gradientStartColor="red"
        gradientStopColor="red"
        curvature={0}
      />

      {/* AnimatedBeams from banks to Cor Jesu */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={metrobankRef}
        toRef={corjesuRef}
        pathWidth={2.5}
        gradientStartColor="red"
        gradientStopColor="red"
        curvature={-120}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={bdoRef}
        toRef={corjesuRef}
        pathWidth={2.5}
        gradientStartColor="red"
        gradientStopColor="red"
        curvature={0}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={landbankRef}
        toRef={corjesuRef}
        pathWidth={2.5}
        gradientStartColor="red"
        gradientStopColor="red"
        curvature={120}
      />
    </div>
  );
}

const Icons = {
  metrobank: () => (
    <Avatar className="p-12 size-36">
      <AvatarImage src="/public/metrobank.png" />
      <AvatarFallback>MTRBNK</AvatarFallback>
    </Avatar>
  ),
  bdo: () => (
    <AspectRatio ratio={16 / 9} className="relative -mt-px -ml-4 size-14">
      <img src="/public/bdo.png" alt="" />
    </AspectRatio>
  ),
  landbank: () => (
    <Avatar className="size-14">
      <AvatarImage src="/public/landbank.png" />
      <AvatarFallback>LNDBK</AvatarFallback>
    </Avatar>
  ),
  user: () => <Student className="size-36" />,
  corjesu: () => (
    <Avatar className="size-16">
      <AvatarImage src="/public/cjc.png" />
      <AvatarFallback>CJC</AvatarFallback>
    </Avatar>
  ),
};

export default PaymentBankChannels;
