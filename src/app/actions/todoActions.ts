'use server'

import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

async function getSupabase() {
  const cookieStore = await cookies()
  return createServerActionClient({
    cookies: () => cookieStore
  })
}

export async function addTodo(task: string) {
  const supabase = await getSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('User not authenticated')

  await supabase.from('todos').insert([{ 
    task, 
    is_complete: false,
    user_id: user.id 
  }])
  revalidatePath('/')
}

export async function toggleTodo(id: string, is_complete: boolean) {
  const supabase = await getSupabase()
  await supabase.from('todos').update({ is_complete }).eq('id', id)
  revalidatePath('/')
}

export async function deleteTodo(id: string) {
  const supabase = await getSupabase()
  await supabase.from('todos').delete().eq('id', id)
  revalidatePath('/')
}