import TodoItem from "../TodoItem/TodoItem";
import UseTodoListLogic from "./UseTodoListLogic";
import { useMemo, useRef } from "react";
import { useState } from "react";
import './List.css';
import { TodosFields } from "../../types/todoTypes/todo";
import DeleteIcon from "../../icons/DeleteIcon";
import EditIcon from "../../icons/EditIcon";
import InfoIcon from "../../icons/InfoIcon";
import Button from "../Button/Button";


export default function TodoList() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { todos, addTodoItem, deleteTodoItem, updateTodoItem } = UseTodoListLogic();
  const [editingId, setEditingId] = useState<string | null>(null);

const setEdit = (id: string | null) => {
    setEditingId(id);
  };
  
  const add = () => {
    
     if (inputRef.current == null ) return
    const value = inputRef.current.value 
    if(value.trim() === "") return
     addTodoItem({ [TodosFields.status]: 'NEW', [TodosFields.Text]:value, [TodosFields.IsDone]:false})
      inputRef.current.value = "";
  }
   
  const memoItems = useMemo(() => {
 
    return todos.map((el) => {
        const edit = editingId === el.id
        return (
          <TodoItem key={el.id}
            item={el}
            updateTodo={updateTodoItem}
            edit={edit}
            setEdit={setEdit}
            >
            <DeleteIcon deleteTodo={deleteTodoItem} id={el.id}/>
            {!el.isDone && <EditIcon edit={setEdit} id={el.id} />}
            <InfoIcon id={el.id} />
          </TodoItem>
      
        )
      })  
  }, [todos,editingId])
  
  return (
  <>
      <div className="todo_input" >
       
        <div className="todo_input_items">
          <input ref={inputRef} type="text" placeholder="...todo" />
          <Button onClick={add} text="ADD" isAsync={true} />
        </div>
  
      </div>
      <ul className="list">
        
      {todos.length >0 ? memoItems: <h3>No items</h3>}
    </ul>
    </>
  )
}
