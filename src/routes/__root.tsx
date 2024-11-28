import AnimatedOutlet from "@/components/anim/animated-outlet";
import { MotionProvider } from "@/components/providers/motion-provider";
import {
  createRootRouteWithContext,
  useMatch,
  useMatches,
} from "@tanstack/react-router";
import { AnimatePresence } from "framer-motion";

export interface AuthenticationContext {
  auth: boolean;
}

export const Route = createRootRouteWithContext<AuthenticationContext>()({
  component: () => {
    const matches = useMatches();
    const match = useMatch({ strict: false });
    const nextMatchIndex = matches.findIndex((d) => d.id === match.id) + 1;
    const nextMatch = matches[nextMatchIndex];
    return (
      <main>
        <MotionProvider>
          <AnimatePresence mode="popLayout">
            <AnimatedOutlet key={nextMatch.id} />
          </AnimatePresence>
        </MotionProvider>
      </main>
    );
  },
});
