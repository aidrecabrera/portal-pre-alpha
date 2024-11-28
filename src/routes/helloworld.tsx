import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/helloworld")({
  component: () => <div>Hello World!</div>,
});
