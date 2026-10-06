import { Router } from "express";
import { validate } from "../validation/validation.js";
import { getTodos, getOneBYID, createTodo, deleteBYID, editByID } from '../controller/todo_controller.js'


const router = Router();

router.get('/', getTodos);
router.get('/:id', getOneBYID);
router.post('/',validate, createTodo);
router.delete('/:id', deleteBYID);
router.patch('/:id',validate, editByID)







export default router









