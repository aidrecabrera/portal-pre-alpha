import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/finance/ledger")({
  component: () => <div />,
});
