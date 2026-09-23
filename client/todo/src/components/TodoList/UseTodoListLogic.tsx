import { useEffect, useState } from 'react';
import type { TodosI } from '../../types/todoTypes/todo';

export default function UseTodoListLogic() {
  const reqLink = 'http://localhost:3000';
  const [todos, setTodos] = useState<TodosI[]>([]);
  const [edit, setEdit] = useState<{ id: string; isEdit: boolean }[]>([]);

  const setEditTrue = (id: string) => {
    setEdit((prev) => {
     
      const elem = prev.find((el) => el.id === id);
      if (!elem) return prev;
      elem.isEdit = true;
      return [...prev];
    });
  };

  const cancelEdit = (id: string) => {
    setEdit((prev) => {
    
      const elem = prev.find((el) => el.id === id);
      if (elem) elem.isEdit = false;
      return [...prev];
    });
  };

  const getTodos = async () => {
    const req = await fetch(reqLink);
    if (req.ok) {
      const res = await req.json();
      const editArr = res.data.map((el: TodosI) => ({
        id: String(el.id),
        isEdit: false,
      }));
      setTodos(res.data);
      setEdit(editArr);
    }
  };

  const addTodo = async (item: string) => {
    if (item.trim() === '') return;

    const req = await fetch(reqLink + '/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: item }),
    });

    if (req.ok) {
      const res = await req.json();
      const todo = { id: String(res.data.id), isEdit: false };
      
 
      setTodos((prev) => [...prev, res.data]);
      setEdit((prev) => [...prev, todo]);
    }
  };

  const deleteTodo = async (id: string) => {
    const req = await fetch(`${reqLink}/delete/${id}`, {
      method: 'DELETE',
    });

    if (req.ok) {
      const res = await req.json();
      const deletedId = res.data;

      setTodos((prev) => prev.filter((el) => el.id !== deletedId));
      setEdit((prev) => prev.filter((el) => el.id !== deletedId));
    }
  };

  const updateTodo = async (id: string, item: string, oldText: string) => {
    if (item.trim() === '' || item === oldText) {
      cancelEdit(id);
      return;
    }

    const req = await fetch(`${reqLink}/edit/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: item }),
    });

    if (req.ok) {
      const res = await req.json();
      cancelEdit(id);


      setTodos((prev) => {
        const index = prev.findIndex((el) => el.id === id);
        if (index === -1) return prev;

        
        prev[index] = {
          ...prev[index],
          ...res.data,
        };
        return [...prev];
      });
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return {
    todos,
    addTodo,
    deleteTodo,
    updateTodo,
    edit,
    setEditTrue,
  };
}