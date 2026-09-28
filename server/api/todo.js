import { Router } from "express";
import { v4 as uuidv4 } from 'uuid';
// import data from '../data.json' with {type:'json'}
import { getFile, setFileJSON } from "../fs/fs.js";

const router = Router();

const getOne = (file,id) => {
  const todo = file.data.find((el) => el.id === id);
  if (todo === undefined) return { ok: false, e: 'no elem' };
  return {ok:true,data:todo}
}

const addFile = async (file,newItem) => {
  const data = file.data;
  data.push(newItem);
  const res = await setFileJSON(data, 'data', 'data.json');
  if (!res.ok) return { ok: false, e: res.e };
  return { ok: true};
}
const deleteFile = async (file,id) => {
  const data = file.data;
  const index = data.findIndex((el) => el.id === id);
  if (index === -1) return { ok: false, e: 'no item to delete' };
  data.splice(index, 1);
  const res = await setFileJSON(data, 'data', 'data.json');
  if (!res.ok) return { ok: false, e: res.e }
  return { ok: true };
}


const updateFile = async (file, newData, id) => {
  const data = file.data;
  console.log(data,'data')
  const index = data.findIndex((el) => el.id === id);
  console.log(index,'index')
  if (index === -1) return { ok: false, e: 'no item to update' };
  data[index] = {
    ...data[index],
    ...newData,
    id: data[index].id
  };
  const res = await setFileJSON(data, 'data', 'data.json')
  if (!res.ok) return { ok: false, e: res.e }
  return { ok: true,data:data[index] };
}




router.get('/', async (req, res) => {
  const file = await getFile('data', 'data.json');
  if (!file.ok) return res.status(404).json({ data: null, e: 'no file' })
  return res.status(200).json({ data: file.data });
})

router.get('/:id', async(req, res) => {
  const id = req.params.id;
  const file = await getFile('data', 'data.json');
  if (!file.ok) return res.status(404).json({ data: null, e: 'no file' })
  const result = getOne(file,id);
  if (!result.ok) return res.status(404).json({ data: null, e: result.e });
  return res.status(200).json({ data: result.data})
})

router.post('/', async (req, res) => {
  const id = uuidv4();
  const newItem = { ...req.body, id };
  const file = await getFile('data', 'data.json');
  if (!file.ok) return res.status(404).json({ data: null, e: 'file' });
  const result = await addFile(file, newItem);
  if (!result.ok) return res.status(500).json({ data: null, e: result.e});


  return res.status(200).json({ data: newItem });

})

router.delete('/:id', async(req, res) => {
  const id = req.params.id;
  const file = await getFile('data', 'data.json');
  if (!file.ok) return res.status(404).json({ data: null, e: 'file' });
  const result =await deleteFile(file, id);
  if (!result.ok) return res.status(500).json({ data: null, e: result.e });

  return res.status(200).json({ data: id })
})

router.patch('/:id', async(req, res) => {
  const newData = req.body;
  const id = req.params.id;
  const file = await getFile('data', 'data.json');
  if (!file.ok) return res.status(404).json({ data: null, e: 'file' });
  const result = await updateFile(file, newData, id);
  if (!result.ok) return res.status(500).json({ data: null, e: result.e });
  return res.status(200).json({ data: result.data })
})






export default router










// const cteateFile = () => 