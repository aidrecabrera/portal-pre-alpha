import { AuthenticatedLayout } from "@/components/layout";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context: { auth } }) => {
    if (!auth) {
      throw redirect({
        to: "/login",
        replace: true,
      });
    }
  },
  component: () => {
    return (
      <AuthenticatedLayout>
        <Outlet />
      </AuthenticatedLayout>
    );
  },
});
