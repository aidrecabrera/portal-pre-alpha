import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/finance/')({
  component: () => <div>Hello /_authenticated/finance/!</div>
})