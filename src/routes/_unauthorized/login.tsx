import { LoginPage } from '@/features/unauthorized/login'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_unauthorized/login')({
  component: LoginPage,
})
