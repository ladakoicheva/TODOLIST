import { deleteFile, setFileDirJSON,getFile  } from "../utils/fs.js";
import { getLiveToken } from "../utils/authHelpers.js";
import { getErrorReq,getSuccessReq } from "../utils/responseHelpers.js";
import { generateToken } from "../utils/authHelpers.js";
import { getUserFile } from "./userService.js";
import { setUsersFile } from "./userService.js";


export const deleteToken = async (token) => {
  try {
    return await deleteFile('tokens', token + '.json');
  } catch (e) {
    return getErrorReq(e);
  }
};

export const getFileToken = async (token) => {
  try {
   
    return await getFile('tokens', token + '.json');
  } catch (error) {
    return getErrorReq(error);
  }
};

export const generateFileTokens = async (token, email) => {
  try {
    const data = { email, date: getLiveToken() };
    return await setFileDirJSON(data, token + '.json', 'tokens');
  } catch (error) {
    return getErrorReq(error);
  }
};

export const refreshToken = async (token, email) => {
  try {
    const user = await getUserFile(email);
    if (!user.ok) return getErrorReq('User not found');

    const newToken = generateToken();
    const userData = { ...user.data, token: newToken };

   
    const createRes = await generateFileTokens(newToken, email);
    const updateRes = await setUsersFile(userData, email);

    if (!createRes.ok || !updateRes.ok) {
      return getErrorReq('Refresh failed');
    }

  
    await deleteToken(token);

    return getSuccessReq(newToken);
  } catch (error) {
    return getErrorReq(error);
  }
};