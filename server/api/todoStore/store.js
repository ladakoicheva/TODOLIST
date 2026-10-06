
import { setTodoFile, getErrorReq, getTodoFile } from "./helpers.js";

import { typeTodo } from "./types.js";
import { ADD, DELETE, UPDATE, GET_ONE } from "./actions.js";

export const dispatchTodoAction = async (action) => {
  const todos = await getTodoFile();
  if (todos === null) return getErrorReq('file no exist');
  const res = await reducer(todos, action)
  return res
}


const reducer = async (todos, { type, ...rest }) => {
  switch (type) {

    case typeTodo.ADD: {
      ADD(todos, rest.newItem);
      break;
    }
    case typeTodo.DELETE: {
      DELETE(todos, rest.id);
      break;
    }
    case typeTodo.UPDATE: {
      UPDATE(todos, rest)

      break;
    }
    case typeTodo.GET_ONE: return GET_ONE(todos, rest.id)

    default: return { ok: true, data: todos };
  }

  const response = await setTodoFile(todos)
  return { response, todos }
}
