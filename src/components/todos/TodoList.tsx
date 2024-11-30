'use client';

import { Todo } from '@/types/todo'
import TodoItem from './TodoItem'
import { useTodos } from '@/lib/store/todos'
import { useEffect } from 'react'

export default function TodoList({ initialTodos }: { initialTodos: Todo[] }) {
  const { todos, setTodos } = useTodos();
  
  useEffect(() => {
    setTodos(initialTodos);
  }, [initialTodos, setTodos]);

  return (
    <div className="flex flex-col gap-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}