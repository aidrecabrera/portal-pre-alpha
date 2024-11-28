import { ModeToggle } from "@/components/providers/mode-toggle";
import { Button } from "@/components/ui/button";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { CircleHelp } from "lucide-react";

export const Route = createFileRoute("/_unauthorized")({
  beforeLoad: async ({ context: { auth } }) => {
    if (auth) {
      throw redirect({
        to: "/",
        replace: true,
      });
    }
  },
  component: PublicLayout,
});

function PublicLayout() {
  return (
    <>
      <div className="fixed z-50 top-4 right-4">
        <ModeToggle />
      </div>
      <div className="fixed z-50 bottom-4 right-4">
        <Button variant="ghost" size="icon">
          <CircleHelp className="w-6 h-6 text-muted-foreground" />
        </Button>
      </div>
      <Outlet />
    </>
  );
}
