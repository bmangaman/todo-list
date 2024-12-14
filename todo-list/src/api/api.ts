import { TodoItem } from './api.types';

const BASE_URL: string = "https://b0f179aa-a791-47b5-a7ca-5585ba9e3642.mock.pstmn.io";
const X_API_KEY: string = "PMAK-65a6d95a73d7f315b0b3ae13-28f9a3fada28cc91e0990b112478319641";

/**
 * Gets the list of todo items from the backend.
 *
 * @returns The list of todo items.
 */
export const getTodoList = async (): Promise<TodoItem[]> => {
  const url: string = `${BASE_URL}/get`;

  try {
		const res = await fetch(url, {
      method: "GET",
      headers: {
        "X-API-Key": X_API_KEY,
        "Content-Type": "application/json",
      },
    });

		const data = await res.json();
  
    if (res.status!==200) {
      throw new Error(data.error.message)
    }

    return data;
	} catch (err) {
		throw(err);
	}
}

/**
 * Updates the todo item with the provided id with the provided update.
 *
 * @param id The id of the todo item to be updated.
 * @param update The updates to be applied to the todo item.
 * @returns Whether or not the update was successful.
 */
export const patchTodoListItem = async (id: string, update: Partial<TodoItem>): Promise<{status: string}> => {
  const url: string = `${BASE_URL}/patch/${id}`;

  try {
		const res = await fetch(url, {
      method: "PATCH",
      headers: {
        "X-API-Key": X_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(update),
    });

		const data = await res.json();
  
    if (res.status!==200) {
      throw new Error(data.error.message)
    }
    if (data.status !== "success") {
      throw new Error("Update was not successful.")
    }

    return data;
	} catch (err) {
		throw(err);
	}
}