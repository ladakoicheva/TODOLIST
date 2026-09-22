import express from 'express';
import cors from 'cors';
import router from './api/todo.js';

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(router)


app.listen(PORT, () => {
  console.log('http://localhost:3000')
})
