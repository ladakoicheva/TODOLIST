import { Router } from "express";
import { v4 as uuidv4 } from 'uuid';
import { typeTodo } from "./types.js";
import { dispatchTodoAction } from "./store.js";



const router = Router();




router.get('/', async (req, res) => {
  const result = await dispatchTodoAction({ type: typeTodo.GET });
  if (!result.ok) return res.status(500).json({ data: null, e: result.e });
  return res.status(200).json({ data: result.data });
})

router.get('/:id', async(req, res) => {
  const id = req.params.id;
  const result = await dispatchTodoAction({ type: typeTodo.GET_ONE,id });
  if (!result.ok) return res.status(500).json({ data: null, e: result.e });
  return res.status(200).json({ data: result.data });
 
})

router.post('/', async (req, res) => {
  const id = uuidv4();
  const newItem = { ...req.body, id };
  const result = await dispatchTodoAction({ type: typeTodo.ADD, newItem });
 
  if (!result.response.ok) return res.status(500).json({ data: null, e: result.e});
  return res.status(200).json({ data: newItem });

})

router.delete('/:id', async(req, res) => {
  const id = req.params.id;

  const result = await dispatchTodoAction({ type: typeTodo.DELETE, id });
  if (!result.response.ok) return res.status(500).json({ data: null, e: result.e });


  return res.status(200).json({ data: id })
})

router.patch('/:id', async (req, res) => {
  const newData = req.body;
  const id = req.params.id;
  console.log(newData)
  const result = await dispatchTodoAction({  type:typeTodo.UPDATE, newData,id });
  if (!result.response.ok) return res.status(500).json({ data: null, e: result.e });

  
  return res.status(200).json({ data: {...newData,id} })
})






export default router










// const cteateFile = () => 