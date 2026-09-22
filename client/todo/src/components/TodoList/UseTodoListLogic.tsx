import { useEffect, useState } from 'react'
import type{ TodosI } from '../../types/todoTypes/todo'

export default function UseTodoListLogic() {
  const reqLink = 'http://localhost:3000';
  const [todos, setTodos] = useState<TodosI[]>([{ id: 1, text: 'ff' }]);
  const [edit, setEdit] = useState<{id:number,isEdit:boolean}[]>(() => {
    return todos.map((el) => {
      return { id: el.id, isEdit: false }
    })
  });
  
  useEffect(() => {
    const editArr = todos.map((el) => {
      return { id: el.id, isEdit: false }
    })
    setEdit(editArr)
  },[todos])

  const setEditTrue = (id:number) => {
    setEdit((prev) => {
      const elem = prev.find((el) => el.id == id);
      if(!elem) return prev
      elem.isEdit = true;
      return [...prev]
    })
  }

  const getTodos = async () => {
    const req = await fetch(reqLink);
    if (req.ok) {
      const res = await req.json() 
   
      setTodos(res.data)
    }
  }

  const addTodo = async (item: string ) => {
    if (item.trim() === '') { return }
   
    const req = await fetch(reqLink + '/add', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json', 
    },
      body: JSON.stringify({ text:item })
    });
    if(req.ok) {
      const res = await req.json() 
      console.log(res ,'res')
      setTodos([ ...todos ,res.data ])
    }
  }

   const deleteTodo = async (id:number|string) => {
   
   
    const req = await fetch(  `${reqLink}/delete/${id}`, {
      method: 'DELETE',
    });
    if(req.ok) {
      const res = await req.json() 
      const filtered = todos.filter((el)=>el.id != res.data)
      setTodos(filtered)
    }
  }

  const updateTodo = async (id: number | string, item:string,oldText:string) => {
    if (item.trim() === '' || item == oldText ) {
    setEdit((prev) => {
      const elem = prev.find((el) => el.id == id);
    if (elem) elem.isEdit = false; 
    return [...prev];
  })
      return
    } 
   
    const req = await fetch(`${reqLink}/edit/${id}`, {
      method: 'PATCH',
      headers: {
      'Content-Type': 'application/json', 
    },
      body: JSON.stringify({ text:item })
    });
    if(req.ok) {
      const res = await req.json() 
      console.log(res ,'res')
    
    setEdit((prev) => {
    const elem = prev.find((el) => el.id == id);
    if (elem) elem.isEdit = false;
    return [...prev];
    })
      setTodos((prev) =>
    prev.map((el) => (el.id == id ? res.data : el))
  )
    }

  }


  useEffect(() => {
    getTodos()
  },[])
  

  return (
    {
      todos,
      addTodo,
      deleteTodo,
      updateTodo,
      edit,
      setEditTrue,
    }
  )
}
