import { createContext,useEffect,useContext,useState } from 'react';
import { ModeType } from './type';
import type { ContextI } from './type';
import type { userI } from './type';
import { authorize } from '../api/users';
import { logout } from '../api/users';

export const UserAuthContext = createContext<ContextI>({
  user: null,
  authMode: ModeType.SIGN_UP,
  changeModeSignUp: () => {},
  changeModeSignIn: () => {},
  changeUserData:()=>{}
})

export function UseUserAuth() {
  const [user, setUser] = useState<userI|null>(null);
  const [mode, setMode] = useState(ModeType.SIGN_UP);
 const isAuth = !!user?.email;
  const changeModeSignUp = () => setMode(ModeType.SIGN_UP);
  const changeModeSignIn = () => setMode(ModeType.SIGN_IN);
  const changeUserData = (user: userI | null) => setUser(user);


  
  
    useEffect(() => {
    const authorizeUser = async () => {
       const res = await authorize();
      if (!res.ok) return setUser(null);
      setUser(res.data);
     
    }
   
    authorizeUser();
    
  },[])

  return (
    {
      user,
      authMode:mode,
      changeModeSignUp,
      changeModeSignIn,
      changeUserData,
      isAuth
    }
  )
}

export const UseUserAuthContext = ()=>useContext(UserAuthContext)
export default UseUserAuthContext