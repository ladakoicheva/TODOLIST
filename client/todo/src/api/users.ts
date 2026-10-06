const reqLink = import.meta.env.VITE_USER_API_URL

type typeReq = 'POST' | 'GET' | 'DELETE' | 'PATCH';
type typeResponseGood<A> = { ok: true, data : A };
type typeResponseBad = { ok: false ,e?:string};

type typeResponseAPI<T> = typeResponseGood<T> | typeResponseBad;


const usersAPI = async < Response, T = undefined > (url: string| null, type :  typeReq = 'GET', body ? : null | T) : Promise<typeResponseAPI<Response>> => {
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
  

export const registerUser = async(formData: { confirmPassword: string, password: string, email: string }) => {
  const data = await usersAPI < { email: string },{ confirmPassword: string, password: string, email: string }>('register', 'POST', formData);
  return data
}