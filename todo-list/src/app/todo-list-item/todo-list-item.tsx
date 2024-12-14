'use client'

import { ChangeEventHandler, FC, useCallback, useMemo } from 'react';

import { patchTodoListItem } from '@/api';

import styles from "./todo-list-item.module.scss";
import { TodoListItemProps } from './todo-list-item.types';

/**
 * TODO LIST ITEM COMPONENT
 */
export const TodoListItem: FC<TodoListItemProps> = (props) =>{
  const { item, onChange } = props;
  const { id, description, isComplete, isOverdue, dueDate } = item;

  const className: string = useMemo(() => {
    let finalClassName: string = styles["todo-list__item"];

    if (isComplete) {
      finalClassName += ` ${styles["todo-list__item--completed"]}`;
    }

    if (isOverdue) {
      finalClassName += ` ${styles["todo-list__item--past-due"]}`;
    }

    return finalClassName;

  }, [isComplete, isOverdue])

  const formattedDueDate: string = useMemo(() => (new Date(dueDate).toLocaleDateString()), [dueDate]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback( async (event) => {
    await patchTodoListItem(id, { isComplete: !event.target.checked  });
    onChange(id, { isComplete: !event.target.checked  });
  }, [id, onChange]);

  return (
    <div className={className} key={id}>
      <label className={styles["todo-list__item__description"]}>
        <input type="checkbox" checked={isComplete} onChange={handleChange} />
        {description}
      </label>
      <div className={styles["todo-list__item__due-date"]}>{formattedDueDate}</div>
    </div>
  );
}