
import type { TodosI } from "../types/todoTypes/todo";

const reqLink = import.meta.env.VITE_API_URL

type typeReq = 'POST' | 'GET' | 'DELETE' | 'PATCH';
type typeResponseGood<A> = { ok: true, data : A };
type typeResponseBad = { ok: false ,e?:string};

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

  export const addTodo = async (item: Partial<TodosI>) : Promise<typeResponseAPI<TodosI>>  => {
    const data = await todoAPI<TodosI, Partial<TodosI>>('', 'POST', item);
    // const data = await todoAPI<TodosI, {text : string}>('', 'POST', {...item, asda : 22, ss : 0});
    return data
  };

  export const deleteTodo = async (id: string):Promise<typeResponseAPI<string>>  => {
    const data = await todoAPI<string>( id, 'DELETE');
    return data
  };

  export const updateTodo = async (id: string, item:Partial<TodosI>) : Promise<typeResponseAPI<TodosI>> => {
    const data = await todoAPI<TodosI, Partial<TodosI>>(id, 'PATCH', item);
    return data
  };

export const getTodos = async () : Promise<typeResponseAPI<TodosI[]>> => {
   const data = await todoAPI<TodosI[]>("", 'GET');
    return data
}
  
export const getOne = async (id:string): Promise<typeResponseAPI<TodosI>> => {
  const data = await todoAPI<TodosI>(id, 'GET');
  return data;
}