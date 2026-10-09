import { Router } from "express";
import { registerUser,loginUser,logout } from "../controllers/authController.js";
import { getUser } from "../controllers/userController.js";
import { authorize } from "../middlewares/auth.js";



const userRouter = Router();


userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/authorization',authorize,getUser)
userRouter.get('/logout',logout)



export default userRouter