import { createContext } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { ModeType } from './type';
import type { ContextI } from './type';
import type { userI } from './type';


export const RegistrationContext = createContext<ContextI>({
  user: null,
  authMode: ModeType.SIGN_UP,
  changeModeSignUp: () => {},
  changeModeSignIn: () => {},
  changeUserData:()=>{}
})

export function UseRegistration() {
  const [user, setUser] = useState<userI|null>(null);
  const [mode, setMode] = useState(ModeType.SIGN_UP);

  const changeModeSignUp = () => setMode(ModeType.SIGN_UP);
  const changeModeSignIn = () => setMode(ModeType.SIGN_IN);
  const changeUserData = (user:userI)=>setUser(user)

  return (
    {
      user,
      authMode:mode,
      changeModeSignUp,
      changeModeSignIn,
      changeUserData
    }
  )
}

export const UseRegistrationContext = ()=>useContext(RegistrationContext)
export default UseRegistrationContext