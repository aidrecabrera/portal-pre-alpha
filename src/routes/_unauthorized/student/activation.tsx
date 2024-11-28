import { Card, CardTitle } from "@/components/ui/card";
import { AccountActivation } from "@/features/unauthorized/registration/account-activation";
import { At } from "@phosphor-icons/react";
import { createFileRoute } from "@tanstack/react-router";

// TODO: follow login page layout
export const Route = createFileRoute("/_unauthorized/student/activation")({
  component: () => (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <Card className="w-full max-w-[300px] p-8 space-y-4">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <At size={72} color="var(--primary)" />
          <CardTitle>Account Activation</CardTitle>
        </div>
        <AccountActivation />
      </Card>
    </div>
  ),
});
