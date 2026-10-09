import { getFileToken } from "../services/tokenService.js";
import { getErrorReq, getSuccessReq } from "../utils/responseHelpers.js";


export const authorize = async (req, res, next) => {

  const token = req.headers.authorization;
  if (!token) return res.status(401).json(getErrorReq('unAuthorized')) ;

  const file = await getFileToken(token);
 

  if (!file.ok) return res.status(401).json(getErrorReq('token is not valid'));

  if (Date.now() > file.data?.date) return res.status(401).json(getErrorReq('token is not valid'));

  req.user = { email: file.data.email };

  next();

  
}
