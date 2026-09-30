export const ADD = (todos,todo) => todos.push(todo); 

export const DELETE = (todos,id) => {
  const index = todos.findIndex((el) => el.id === id);
  todos.splice(index, 1);
}

export const UPDATE = (todos,rest) => {
  const index = todos.findIndex((el) => el.id === rest.id);
  const elem = todos[index]
  const updateTodo = {
    ...elem,
    ...rest.newData,
    id: elem.id
  };
  todos[index] = updateTodo

}

export const GET_ONE = (todos,id) => {
  const todo = todos.find((el) => el.id === id);
  if (todo === undefined) return { ok: false, e: 'no elem' };
  return { ok: true, data: todo }
}