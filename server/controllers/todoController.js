import { dispatchTodoAction } from "../api/todoStore/store.js";
import { typeTodo } from "../api/todoStore/types.js";
import { v4 as uuidv4 } from 'uuid';
import { status } from "../api/todoStore/types.js";




export const getTodos = async (req, res) => {
  const result = await dispatchTodoAction({ type: typeTodo.GET });
  console.log(result);
  
  if (!result.ok) return res.status(500).json({ ok: false, e: result.e });
  return res.status(200).json({ ok: true, data: result.data });
};

export const getOneBYID = async (req, res) => {
  const id = req.params.id;
  const result = await dispatchTodoAction({ type: typeTodo.GET_ONE, id });
  if (!result.ok) return res.status(404).json({ ok: false, e: result.e });
  return res.status(200).json({ ok: true, data: result.data });
};

export const createTodo = async (req, res) => {
  const id = uuidv4();
  const newItem = { text: req.body.text, id, isDone: false, status: status.NEW };

  const result = await dispatchTodoAction({ type: typeTodo.ADD, newItem });
  if (!result.ok) return res.status(500).json({ ok: false, e: result.e });

  return res.status(201).json({ ok: true, data: newItem });
};

export const deleteBYID = async (req, res) => {
  const id = req.params.id;
  const result = await dispatchTodoAction({ type: typeTodo.DELETE, id });


  if (!result.ok) return res.status(500).json({ ok: false, e: result.e });
  return res.status(200).json({ ok: true, data: id });
};

export const editByID = async (req, res) => {
  const newData = req.body;
  const id = req.params.id;

  const result = await dispatchTodoAction({ type: typeTodo.UPDATE, newData, id });

  if (!result.ok) return res.status(500).json({ ok: false, e: result.e });

  return res.status(200).json({ ok: true, data: { ...newData, id } });
};