export interface Todo {
  id: string;
  user_id: string;
  task: string;
  is_complete: boolean;
  created_at: string;
  priority: number;
}

export type CreateTodoInput = Pick<Todo, 'task' | 'priority'>;
export type UpdateTodoInput = Partial<Pick<Todo, 'is_complete' | 'task' | 'priority'>>;
