import { useRef } from "react";
import type { TodosI } from "../../types/todoTypes/todo";
import "./TodoItem.css";
import { memo } from "react";

type props = {
  item: TodosI;
  deleteTodo: (id: string) => Promise<void>;
  isEdit: boolean;
  setEditTrue: (id: string) => void;
  updateTodo: (id: string, newText: string, oldText: string) => Promise<void> 
};

 function TodoItem({
  item,
  deleteTodo,
  isEdit,
  setEditTrue,
  updateTodo,
}: props) {

  console.log('render item');


  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleBlur = () => {
    if (inputRef.current) {
      updateTodo(item.id, inputRef.current.value, item.text);
    }
  };

  return (
    <li className="li_item">
      {!isEdit ? (
        <span>{item.text}</span>
      ) : (
        <input
          type="text"
          ref={inputRef}
          defaultValue={item.text}
          autoFocus
          onBlur={handleBlur}
        
        />
      )}

      <div className="icons">
        <svg
          onClick={() => deleteTodo(item.id)}
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

        <svg
          onClick={() => {
            setEditTrue(item.id)
             if(inputRef.current) inputRef.current.focus();
          }
          }
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
        </svg>
      </div>
    </li>
  );
}

const getIsRender = (prev: props, next: props) => {
return (
    prev.isEdit === next.isEdit &&
    prev.item.text === next.item.text 
   
  );
}

export default memo(TodoItem,getIsRender)