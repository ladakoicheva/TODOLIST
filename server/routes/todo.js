import { Router } from "express";
import { validate } from "../middlewares/todoDataValidation.js";
import { getTodos,getOneBYID,createTodo,deleteBYID,editByID } from "../controllers/todoController.js";
import { authorize } from "../middlewares/auth.js";


const router = Router();

router.get('/', getTodos);
router.get('/:id', getOneBYID);
router.post('/',validate, createTodo);
router.delete('/:id',authorize, deleteBYID);
router.patch('/:id',authorize,validate, editByID)







export default router









