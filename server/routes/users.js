import { Router } from "express";
import { registerUser ,getUser} from "../controller/users_controller/users_controller.js";





const userRouter = Router();


userRouter.post('/register',registerUser)
userRouter.get('/:email',getUser)





export default userRouter