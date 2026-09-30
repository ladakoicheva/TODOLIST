import { useRef } from "react";
import type { TodosI } from "../../types/todoTypes/todo";
import { TodosFields } from "../../types/todoTypes/todo";
import "./TodoItem.css";
import { memo } from "react";
import { useNavigate } from "react-router";

type props = {
  edit: boolean;
  setEdit: (e:string|null) => void;
  item: TodosI;
  deleteTodo: (id: string) => Promise<void>;
  updateTodo: (id: string, item:Partial<TodosI>) => Promise<void> 
};

 function TodoItem({
  item,
  deleteTodo,
   updateTodo,
   edit,
  setEdit,
}: props) {


   
   const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
   const handleBlur = () => {
     if (inputRef.current?.value === item.text) {
       setEdit(null);
       return
    }
    if (inputRef.current && inputRef.current.value) {
      updateTodo(item.id, {[TodosFields.Text]:inputRef.current.value});
    }
    setEdit(null)
    

  };
   
  const handleStatusChange = async() => {
    await updateTodo(item.id, { [TodosFields.IsDone]: !item.isDone })
  
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
           <div><input type="checkbox" checked={item.isDone} onChange={handleStatusChange}
          /></div> <span className={item.isDone?'done':""}>{item.text}</span></div>
  )}
      
      <div className="icons">
        <svg
          onClick={() => deleteTodo(item.id)}
          className="deleteIcon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 6h18" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <line x1="10" y1="11" x2="10" y2="17" />
          <line x1="14" y1="11" x2="14" y2="17" />
        </svg>
        {!item.isDone&&
          <svg
            onClick={() => {
              setEdit(item.id)
          
            }
            }
            className="editIcon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>}
        <svg
          onClick={()=>navigate(`/${item.id}`)}
          className="infoIcon"
          xmlns="http://www.w3.org/2000/svg"
          width="20" height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
  <circle cx="12" cy="12" r="10"></circle>
  <line x1="12" y1="16" x2="12" y2="12"></line>
  <line x1="12" y1="8" x2="12.01" y2="8"></line>
</svg>
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