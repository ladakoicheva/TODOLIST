import TodoItem from "../TodoItem/TodoItem";
import UseTodoListLogic from "./UseTodoListLogic";
import { useRef } from "react";
import './List.css'
export default function TodoList() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { todos ,addTodo,deleteTodo,edit,setEditTrue,updateTodo} = UseTodoListLogic();
   
  return (
  <>
      <div>
        <input ref={inputRef} type="text" placeholder="...todo" />
        <button onClick={() => {
          if (inputRef.current == null ) return
          const value = inputRef.current.value 
          addTodo(value)
          inputRef.current.value = "";

        }}>ADD</button>
      </div>
    <ul className="list">{
      todos.map((el) => {
        return (
          <TodoItem key={el.id} item={el } deleteTodo={deleteTodo} edit={edit} setEditTrue={setEditTrue} updateTodo={updateTodo} />
        )
      })
    }</ul>
    </>
  )
}
