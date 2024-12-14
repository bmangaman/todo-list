'use client'

import { FC, useCallback, useEffect, useMemo, useState } from 'react';

import { type TodoItem, getTodoList  } from '@/api';
import { LoadingSpinner } from '@/shared';

import { type TodoItemWithOverdue, TodoListItem, type TodoListItemProps } from './todo-list-item';

import styles from "./page.module.scss";

/**
 * PAGE COMPONENT
 * 
 * The main page of the application. Basically just makes the call to get the list of todo list items, sorts them, and
 * then displays them using the TodoListItem component.
 */
const Page: FC = () => {
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    getTodoListWrapper();
  }, [])

  const sortedTodoItems = useMemo(() => {
    const now = new Date();

    const sorted = todoItems.sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime() );
    const overdue: TodoItemWithOverdue[] = [];
    const completed: TodoItemWithOverdue[] = [];
    const todo: TodoItemWithOverdue[] = [];

    sorted.forEach((item) => {
      if (item.isComplete) {
        completed.push({ ...item, isOverdue: false });
      } else if (!item.isComplete && new Date(item.dueDate) < now) {
        overdue.push({ ...item, isOverdue: true });
      } else {
        todo.push({ ...item, isOverdue: false });
      }
    });

    return [...overdue, ...todo, ...completed];;
  }, [todoItems]);

  const getTodoListWrapper = () => {
    setIsLoading(true);
    setError("");

    getTodoList().then((items) => {
      console.log("items", items);
      setTodoItems(items);
    }).catch((err) => {
      console.log("error", err);
      setError(err.message);
    }).finally(() => {
      setIsLoading(false);
    })
  }

  const onError: TodoListItemProps["onError"] = (err) => {
    setError(err.message);
  }

  const onChange: TodoListItemProps["onChange"] = useCallback((id, change) => {
    /** since the api is a mock, it does not actually update and this just resets the todo list  */
    // getTodoListWrapper();

    const matchingIndex = todoItems.findIndex((item) => item.id === id);

    if (matchingIndex > -1) {
      const newTodoItems = [...todoItems];
      newTodoItems[matchingIndex] = { ...todoItems[matchingIndex], ...change};
      setTodoItems(newTodoItems);
      console.log("set new todo item", id, change)
    }
  }, [todoItems]);

  return (
    <>
      <h1 className={styles.header}>Todo App</h1>
      <main className={styles.page}>
        {error && <div className="error">{error}</div>}
        {isLoading && <LoadingSpinner />}
        {!isLoading && sortedTodoItems?.map((todoItem) => (<TodoListItem key={todoItem.id} item={todoItem} onChange={onChange} onError={onError} />))}
      </main>
    </>
  );
}

export default Page;




