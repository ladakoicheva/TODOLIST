import { generateToken } from "../utils/authHelpers.js";
import { deleteToken, generateFileTokens, getFileToken } from "../services/tokenService.js";
import { setUsersFileDir, getUserFile } from "../services/userService.js";
import { getErrorReq, getSuccessReq } from "../utils/responseHelpers.js";
import { v4 as uuidv4 } from 'uuid';
import { refreshToken } from "../services/tokenService.js";

export const registerUser = async (req, res) => {
  // req.headers.authorization 

  const email = req.body.email;
  const password = req.body.password;
  const token = generateToken();
  const data = { email, password, id: uuidv4(), token }

  const [tokens, userData] = await Promise.all([generateFileTokens(token, email), setUsersFileDir(data, email)])
  if (!tokens.ok || !userData.ok) return res.status(400).json(getErrorReq('registratiom failed'))


  delete data.password
  return res.status(201).json(getSuccessReq(data))

}


export const loginUser = async (req, res) => {

  const { email, password } = req.body;
  const token = req.headers.authorization;


  const userRes = await getUserFile(email);

  if (!userRes.ok) {
    return res.status(400).json(getErrorReq('email does not exist'));
  }

  const user = userRes.data;

  if (user.password !== password) {
    return res.status(400).json(getErrorReq('wrong password'));
  }





  const tokenRes = await getFileToken(token);
  const tokenDate = tokenRes.data?.date;


  if (!tokenRes.ok || Date.now() > tokenDate) {
    const refreshRes = await refreshToken(token, email);
    if (!refreshRes.ok) {
      return res.status(500).json(getErrorReq('failed to refresh token'));
    }

    user.token = refreshRes.data

  }


  const responseData = { ...user};
  delete responseData.password;

  return res.status(200).json(getSuccessReq(responseData));
};





export const logout = async (req, res) => {
  const token = req.headers.authorization;
  const result = await deleteToken(token);

  if (!result.ok) res.status(500).json(getErrorReq(result.e));

  return res.status(200).json(getSuccessReq(result.data));

}





