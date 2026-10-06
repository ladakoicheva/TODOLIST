import express from 'express';
import cors from 'cors';
import router from './routes/todo.js';
import userRouter from './routes/users.js';

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.use('/todos',router)
app.use('/users',userRouter)

app.listen(PORT, () => {
  console.log('http://localhost:3000')
})
