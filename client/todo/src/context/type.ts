export interface ContextI{
  user: userI|null
  authMode: ModeType
  changeModeSignUp: () => void,
  changeModeSignIn: () => void,
  changeUserData:(user:userI)=>void
}

export enum ModeType {
  SIGN_IN = 'Sign In',
  SIGN_UP = 'Sign Up'
}

export type userI = {email:string,id:string}