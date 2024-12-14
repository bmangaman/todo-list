import type { TodoItem } from '@/api';

export type TodoItemWithOverdue = TodoItem & {
  isOverdue: boolean;
}

export type TodoListItemProps = {
  item: TodoItemWithOverdue;
  onChange: (id: TodoItem["id"], change: Partial<TodoItemWithOverdue>) => void;
  onError: (err: Error) => void;
}
