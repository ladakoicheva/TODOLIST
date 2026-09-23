import TodoItem from "../TodoItem/TodoItem";
import UseTodoListLogic from "./UseTodoListLogic";
import { useMemo, useRef } from "react";
import { useState } from "react";
import './List.css';


export default function TodoList() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { todos, addTodoItem, deleteTodoItem, updateTodoItem } = UseTodoListLogic();
  const [editingId, setEditingId] = useState<string | null>(null);

  const setEdit = (id:string|null) => {
    setEditingId(id)
  }
  console.log('render list')
  
  const add = () => {
     if (inputRef.current == null ) return
      const value = inputRef.current.value 
      addTodoItem(value)
      inputRef.current.value = "";
  }
   
  const memoItems = useMemo(() => {
 
    return todos.map((el) => {
        const edit = editingId === el.id
        return (
          <TodoItem key={el.id}
            item={el}
            deleteTodo={deleteTodoItem}
            updateTodo={updateTodoItem}
            edit={edit}
            setEdit={setEdit}
          />
          
      
        )
      })  
  }, [todos,editingId])
  
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
