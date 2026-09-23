import TodoItem from "../TodoItem/TodoItem";
import UseTodoListLogic from "./UseTodoListLogic";
import { useMemo, useRef } from "react";
import './List.css'
export default function TodoList() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { todos, addTodo, deleteTodo, edit, setEditTrue, updateTodo } = UseTodoListLogic();
  
  
  const add = () => {
     if (inputRef.current == null ) return
      const value = inputRef.current.value 
      addTodo(value)
      inputRef.current.value = "";
  }
   
  const memoItems = useMemo(() => {
 
    return todos.map((el) => {
         const isEdit = edit.find((item) => item.id === el.id)?.isEdit as boolean;
        return (
          <TodoItem key={el.id}
            item={el}
            deleteTodo={deleteTodo}
            isEdit={isEdit}
            setEditTrue={setEditTrue}
            updateTodo={updateTodo} />
        )
      })  
  }, [todos,edit])
  
  return (
  <>
      <div>
        <input ref={inputRef} type="text" placeholder="...todo" />
        <button onClick={add}>ADD</button>
      </div>
    <ul className="list">
      {todos.length >0 ? memoItems: <h3>No items</h3>}
    </ul>
    </>
  )
}
