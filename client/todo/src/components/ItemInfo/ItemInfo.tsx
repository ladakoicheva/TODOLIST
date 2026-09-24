import { useEffect, useState } from "react"
import type { TodosI } from "../../types/todoTypes/todo";
import { getOne } from "../../api/todo";
import { useParams } from "react-router";
import './ItemInfo.css';

export default function ItemInfo() {
  const [todo, setTodo] = useState<TodosI | null>(null);
  const params = useParams<string>();
  useEffect(() => {
    const getOneI = async () => {
      console.log(params.id)
      const res = await getOne(params.id as string);
      if (!res.ok) return;
      setTodo(res.data);
    }
    getOneI()
  }, [params.id])
  
  if(!todo) return <div>NO INFO</div>

  return (
    <div>
      <h1 className="todoId">{todo?.id}</h1>
      <h2>{todo?.text}</h2>
    </div>
  )
}
