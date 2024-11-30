'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation';
import { useTodos } from '@/lib/store/todos';

export default function CreateTodo() {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState(1);
  const router = useRouter();
  const addTodo = useTodos(state => state.addTodo);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.trim()) return;

    // Create optimistic todo
    const optimisticTodo = {
      id: Math.random().toString(),
      task: task.trim(),
      priority: Math.max(1, Math.min(5, priority)),
      is_complete: false,
      created_at: new Date().toISOString(),
      user_id: '' // Will be set by server
    };

    // Add optimistically
    addTodo(optimisticTodo);
    
    // Reset form immediately
    setTask('');
    setPriority(1);

    try {
      const res = await fetch('/api/todos', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ 
          task: optimisticTodo.task,
          priority: optimisticTodo.priority
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        throw await res.json();
      }

      router.refresh();
    } catch (err) {
      console.error('Failed to add todo:', err);
      // Could add error handling to remove optimistic todo on failure
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <Input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="What needs to be done?"
        className="flex-1"
      />
      <Input
        type="number"
        value={priority}
        onChange={(e) => setPriority(Number(e.target.value))}
        placeholder="Priority"
        className="w-20"
      />
      <Button type="submit">Add Todo</Button>
    </form>
  );
}
