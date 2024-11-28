import { useMutation } from '@tanstack/react-query'
import { supabase } from './supabase-client'

export const isAuthenticated = async (): Promise<boolean> => {
  try {
    return await useAuth()
  } catch (error) {
    console.error('Failed to authenticate', error)
    return false
  }
}

export async function useAuth(): Promise<boolean> {
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return !!session?.user
}

export function useLogout() {
  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    },
  })
}

export function useLogin() {
  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string
      password: string
    }) => {
      const { data: response, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      return response
    },
  })
}

export function useRegister() {
  return useMutation({
    mutationFn: async ({
      email,
      password,
      entity_name,
      fb_page,
      institution_id,
      realtalk_handle,
    }: {
      email: string
      password: string
      entity_name: string
      fb_page: string
      institution_id: string | undefined
      realtalk_handle: string
    }) => {
      const { data: response, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            entity_name,
            realtalk_handle,
            institution_id,
            fb_page,
          },
        },
      })
      if (error) throw error
      return response
    },
  })
}

export function useResetPassword() {
  return useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update`,
      })
      if (error) throw error
      return data
    },
  })
}

export function useUpdatePassword() {
  return useMutation({
    mutationFn: async ({ password }: { password: string }) => {
      const { data, error } = await supabase.auth.updateUser({ password })
      if (error) throw error
      return data
    },
  })
}
