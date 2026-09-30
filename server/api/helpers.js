import { getFile,setFileJSON } from "../fs/fs.js";

export const getTodoFile = async () => {
  const response = await getFile('data', 'data.json');
  if (response.ok) return response.data;
  return null;
};
export const setTodoFile = async (data) => {
  const response = await setFileJSON(data, 'data', 'data.json');
 return response
};

export const getErrorReq = (error) => { return { ok: false, e: error } }
