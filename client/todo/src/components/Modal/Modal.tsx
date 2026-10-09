import style from './Modal.module.css'
import { ModeType } from '../../context/type'
import SignUpForm from '../SignUpForm/SignUpForm'
import SignInForm from '../SignInForm/SignInForm'
import UseUserAuthContext from '../../context/UserAuthContext'

type props = {
  close: () => void 
}
export default function Modal({ close }: props) {
  const { authMode, changeModeSignIn, changeModeSignUp, changeUserData } = UseUserAuthContext();

  return (
    <div className={style.blur}>
  
      <div className={style.modal}>
            <span className={style.close} onClick={close}>×</span>
          {authMode === ModeType.SIGN_UP ?
          <SignUpForm changeUserData={changeUserData } closeModal = {close} />
          : <SignInForm changeUserData={changeUserData } closeModal = {close}/>}
        <div>
          {authMode === ModeType.SIGN_UP ?
            <p>Already have an account? <span onClick={changeModeSignIn}>Sign In</span></p>
          : <p>Do not have an account? <span onClick={changeModeSignUp}>Sign Up</span></p>}
      </div>
      </div>
      
      
    </div>
  )
}
