import { setUsersFile, getUserFile } from "./helpers.js";
import { getErrorReq } from "./helpers.js";
import { v4 as uuidv4 } from 'uuid';

export const registerUser = async (req, res) => {

  const email = req.body.email;
  const password = req.body.password
  const data = { email, password, id: uuidv4() }
  const result = await setUsersFile(data, email);
  if (!result.ok) return res.status(400).json(getErrorReq(result.e))
  delete data.password
  return res.status(201).json({ ok: true, data })

}

export const getUser = async (req, res) => {

  const email = req.params.email;


  const result = await getUserFile( email);

  if (!result) return res.status(400).json(getErrorReq('user does not exist'));

  const data = { ...result };

  delete data.password;
  return res.status(200).json({ ok: true, data })

}