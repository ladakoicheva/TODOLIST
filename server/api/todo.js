import { Router } from "express";
import { v4 as uuidv4 } from 'uuid';
import data from '../data.json' with {type:'json'}
const router = Router();

router.get('/todos', (req, res) => {
  return res.status(200).json({data})
})

router.get('/todos/:id', (req, res) => {
  const id = req.params.id;
  const todo = data.find((el) => el.id === id);
  if (todo === undefined) return res.status(404).json({ data: null, e: 'no elem' })
  return res.status(200).json({ data:todo })
})

router.post('/todos', (req, res) => {
  const id = uuidv4();
  const newItem = { ...req.body };
  newItem.id = id
  data.push(newItem);
  return res.status(200).json({ data : newItem});

})

router.delete('/todos/:id', (req,res) => {
  const id = req.params.id;
  const index = data.findIndex((el) => el.id === id);
  if (index === -1) return res.status(404).json({ data: null,e:'no elem'})
  data.splice(index, 1);
  return res.status(200).json({ data: id })
})

router.patch('/todos/:id', (req, res) => {
  const newData = req.body;
  const id = req.params.id
  const index = data.findIndex((el) => el.id === id);
  if (index === -1) return res.status(404).json({ data: null, e: 'no elem to update' })
  data[index] = {
    ...data[index],
    ...newData,
    id: data[index].id
  }
  return res.status(200).json({ data: data[index] })
})






export default router










// const cteateFile = () => 