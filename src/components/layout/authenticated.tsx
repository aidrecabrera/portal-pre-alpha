import { useMediaQuery } from "@/hooks/use-media-query";
import { routes } from "@/resources";
import { useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";
import React, { useEffect, useMemo, useRef } from "react";
import { Sidebar } from "./sidebar/sidebar";

const MemoizedSidebar = React.memo(Sidebar);

export const AuthenticatedLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const routeTreeLinks = useMemo(() => routes, []);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (mainRef.current) {
      const lenis = new Lenis({
        wrapper: mainRef.current,
        content: mainRef.current,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        touchInertiaMultiplier: 1.5,
        lerp: 0.1,
        orientation: "vertical",
        gestureOrientation: "vertical",
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      return () => {
        lenis.destroy();
      };
    }
  }, []);

  const router = useRouterState();
  const showSidebar = router.location.pathname === "/finance/payment";
  const isMobile = useMediaQuery("(max-width: 1024px)");
  return (
    <div className="flex h-screen overflow-hidden">
      <AnimatePresence>
        {!showSidebar && (
          <motion.div
            className="h-full"
            initial={isMobile ? false : { width: 0, opacity: 0 }}
            animate={isMobile ? undefined : { width: 288, opacity: 1 }}
            exit={isMobile ? undefined : { width: 0, opacity: 0 }}
            transition={isMobile ? undefined : { duration: 0.5 }}
          >
            <MemoizedSidebar routes={routeTreeLinks} />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.main ref={mainRef} className="flex-1 overflow-y-auto">
        <div className="container px-6 py-6">{children}</div>
      </motion.main>
    </div>
  );
};
