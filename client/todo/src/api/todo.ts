import type { TodosI } from "../types/todoTypes/todo";

const reqLink = 'http://localhost:3000';

type typeReq = 'POST' | 'GET' | 'DELETE' | 'PATCH';
type typeResponseGood<A> = { ok: true, data : A };
type typeResponseBad = { ok: false };

type typeResponseAPI<T> = typeResponseGood<T> | typeResponseBad;


const todoAPI = async < Response, T = undefined > (url: string| null, type :  typeReq = 'GET', body ? : null | T) : Promise<typeResponseAPI<Response>> => {
  try {
    const response = await fetch(url ? `${reqLink}/${url}` : reqLink, {
      method: type,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : null,
     });
      if(!response.ok) return {ok : false}
    const res: { data: Response } = await response.json();
      return {ok : true, data:res.data}
    } catch (e) {
    return {ok : false}
    }
  } 

  export const addTodo = async (item: string) : Promise<typeResponseAPI<TodosI>>  => {
    const data = await todoAPI<TodosI, {text : string}>('add', 'POST', {text : item});
    return data
  };

  export const deleteTodo = async (id: string):Promise<typeResponseAPI<string>>  => {
    const data = await todoAPI<string>( 'delete/'+id, 'DELETE');
    return data
  };

  export const updateTodo = async (id: string, item: string) : Promise<typeResponseAPI<TodosI>> => {
    const data = await todoAPI<TodosI, {text : string}>('edit/'+id, 'PATCH', {text : item});
    return data
  };

export const getTodos = async () : Promise<typeResponseAPI<TodosI[]>> => {
   const data = await todoAPI<TodosI[]>("", 'GET');
    return data
}
  
export const getOne = async (id:string): Promise<typeResponseAPI<TodosI>> => {
  const data = await todoAPI<TodosI>(id, 'GET');
  console.log(data)
  return data;
}