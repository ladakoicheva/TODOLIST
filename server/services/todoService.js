import { getFile, setFileJSON } from "../utils/fs.js";
import { getErrorReq,getSuccessReq } from "../utils/responseHelpers.js";

export const getTodoFile = async () => {

  return await getFile('data', 'data.json');
};

export const setTodoFile = async (data) => {

  return await setFileJSON(data, 'data', 'data.json');
};


