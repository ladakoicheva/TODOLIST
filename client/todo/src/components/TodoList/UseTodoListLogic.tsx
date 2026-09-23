import { useEffect, useState } from 'react';
import type { TodosI } from '../../types/todoTypes/todo';
import { deleteTodo } from '../../api/todo';
import { getTodos } from '../../api/todo';
import { addTodo } from '../../api/todo';
import { updateTodo } from '../../api/todo';

export default function UseTodoListLogic() {

  const [todos, setTodos] = useState<TodosI[]>([]);
 

  const getTodosItems = async () => {
    const res = await getTodos();
    
   if (res.ok === false) return ;
    const todos = res.data;
  

    setTodos(todos);
  
  };
  

  const addTodoItem = async (item: string) => {
    if (item.trim() === '') return;

    const res = await addTodo(item);
    if (res.ok === false) return;
 
    
      setTodos((prev) => [...prev, res.data]);
     
    }
  
  const deleteTodoItem = async (id: string) => {
    const res = await deleteTodo(id);
     if (res.ok === false) return;
      const deletedId = res.data;

      setTodos((prev) => prev.filter((el) => el.id !== deletedId));
   
   
  };

  const updateTodoItem = async (id: string, item: string, oldText: string) => {
    if (item.trim() === '' || item === oldText) {

      return;
    }

    const res = await updateTodo(id,item)
    if(!res.ok) return 
    
      


      setTodos((prev) => {
        const index = prev.findIndex((el) => el.id === id);
        if (index === -1) return prev;

        
        prev[index] = {
          ...prev[index],
          ...res.data,
        };
        return [...prev];
      });
  
  };

  useEffect(() => {
    getTodosItems();
  }, []);

  return {
    todos,
    addTodoItem,
    deleteTodoItem,
    updateTodoItem,
 
  };
}
