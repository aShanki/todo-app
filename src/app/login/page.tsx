import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers' 
import { redirect } from 'next/navigation'
import AuthForm from '../auth/components/AuthForm'

export default async function LoginPage() {
  const cookieStore = await cookies()
  
  const supabase = createServerComponentClient({
    cookies: () => ({
      get: async (name: string) => {
        const cookie = await cookieStore.get(name)
        return cookie?.value
      },
      set: async (name: string, value: string, options: any) => {
        try {
          await cookieStore.set(name, value, options)
        } catch (error) {
          // This can safely be ignored during SSR
        }
      },
      remove: async (name: string, options: any) => {
        try {
          await cookieStore.set(name, '', { ...options, maxAge: 0 })
        } catch (error) {
          // This can safely be ignored during SSR
        }
      }
    })
  })

  const { data: { session } } = await supabase.auth.getSession()

  if (session) {
    redirect('/')
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-muted/20">
      <AuthForm />
    </main>
  )
}
