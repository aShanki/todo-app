'use client';

import { toggleTodo as toggleTodoAction, deleteTodo as deleteTodoAction } from '@/app/actions/todoActions'
import { Todo } from '@/types/todo'
import { useTodos } from '@/lib/store/todos'

export default function TodoItem({ todo }: { todo: Todo }) {
  const { toggleTodo, removeTodo } = useTodos();

  const handleToggle = async () => {
    const newValue = !todo.is_complete;
    toggleTodo(todo.id, newValue);
    await toggleTodoAction(todo.id, newValue);
  };

  const handleDelete = async () => {
    removeTodo(todo.id);
    await deleteTodoAction(todo.id);
  };

  return (
    <div className="flex items-center gap-3 p-4 border rounded-lg">
      <input
        type="checkbox"
        checked={todo.is_complete}
        onChange={handleToggle}
        className="h-4 w-4"
      />
      <span className={todo.is_complete ? 'line-through' : ''}>
        {todo.task}
      </span>
      <span className="ml-auto">
        Priority: {todo.priority}
      </span>
      <button
        onClick={handleDelete}
        className="ml-auto text-red-500"
      >
        Delete
      </button>
    </div>
  );
}