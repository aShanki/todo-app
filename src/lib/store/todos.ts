
import { create } from 'zustand'
import { Todo } from '@/types/todo'

interface TodosState {
  todos: Todo[]
  setTodos: (todos: Todo[]) => void
  addTodo: (todo: Todo) => void
  removeTodo: (id: string) => void
  toggleTodo: (id: string, is_complete: boolean) => void
}

export const useTodos = create<TodosState>((set) => ({
  todos: [],
  setTodos: (todos) => set({ todos }),
  addTodo: (todo) => set((state) => ({ todos: [todo, ...state.todos] })),
  removeTodo: (id) => set((state) => ({ 
    todos: state.todos.filter(t => t.id !== id) 
  })),
  toggleTodo: (id, is_complete) => set((state) => ({
    todos: state.todos.map(t => t.id === id ? { ...t, is_complete } : t)
  }))
}))