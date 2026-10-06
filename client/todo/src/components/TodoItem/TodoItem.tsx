import {  useRef } from "react";
import type { TodosI } from "../../types/todoTypes/todo";
import { TodosFields } from "../../types/todoTypes/todo";
import "./TodoItem.css";
import { memo } from "react";


type props = {
  edit: boolean;
  setEdit: (e:string|null) => void;
  item: TodosI;
  updateTodo: (id: string, item: Partial<TodosI>) => Promise<void>;
  children:React.ReactNode
};

 function TodoItem({
  item,
  updateTodo,
  edit,
  setEdit,
  children,
 }: props) {
   


const inputRef = useRef<HTMLInputElement>(null);
const handleBlur = () => {
     if (inputRef.current?.value === item.text) {
       setEdit(null);
       return
    }
    if (inputRef.current && inputRef.current.value) {
      updateTodo(item.id, {[TodosFields.Text]:inputRef.current.value,[TodosFields.status]:'UPDATED'});
    }
    setEdit(null)
    

  };
const handleStatusChange = async() => {
  await updateTodo(item.id,
    { [TodosFields.IsDone]: !item.isDone, [TodosFields.status]: 'UPDATED' })
  
}


  return (
<li className="li_item">
  {edit  ? (
    <input
      type="text"
      ref={inputRef}
      defaultValue={item.text}
      autoFocus
      onBlur={handleBlur}
     onKeyDown={(e) => {
  if (e.key === "Enter") handleBlur();
}}
    />
      ) : (
    
      <div className="li_text_i">
            <div>
              <input type="checkbox" checked={item.isDone} onChange={handleStatusChange}
              />
            </div> <span className={item.isDone ? 'done' : ""}>{item.text}</span></div>
  )}
      
      <div className="icons">
       {children}
      </div>
    </li>
  );
}

const getIsRender = (prev: props, next: props) => {


  return prev.item.text === next.item.text &&
    prev.item.isDone === next.item.isDone && 
    prev.edit === next.edit
  
  
}

export default memo(TodoItem,getIsRender)