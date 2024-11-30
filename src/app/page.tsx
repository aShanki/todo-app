import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import TodoList from '@/components/todos/TodoList';
import CreateTodo from '@/components/todos/CreateTodo';
import LogoutButton from '@/components/auth/LogoutButton';

export default async function Home() {
  const cookieStore = await cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  
  const { data: { user }, error } = await supabase.auth.getUser();
  if (!user || error) {
    redirect('/login');
  }

  const { data: todos } = await supabase
    .from('todos')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Todos</h1>
        <LogoutButton />
      </div>
      <CreateTodo />
      <TodoList initialTodos={todos || []} />
    </div>
  );
}
