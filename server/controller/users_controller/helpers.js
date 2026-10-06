import { getFile, setFileDirJSON} from "../../fs/fs.js";

export const getUserFile = async (email) => {
  const response = await getFile('users', email,'user.json');
  if (response.ok) return response.data;
  return null;
};


export const setUsersFile = async (data,email) => {
  const response = await setFileDirJSON(data, 'users', email);

  return response
};

export const getErrorReq = (error) => { return { ok: false, e: error } }
