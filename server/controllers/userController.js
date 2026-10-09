import { getUserFile } from "../services/userService.js";
import { getErrorReq, getSuccessReq } from "../utils/responseHelpers.js";





export const getUser = async (req, res) => {
  const { email } = req.user;
  const user = await getUserFile(email);
  if (!user.ok) return res.status(401).json(getErrorReq(user.e));
  const data = { ...user.data };

  delete data.password;



  return res.status(200).json(getSuccessReq(data));
}