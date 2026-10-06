import UseRegistrationContext from '../../context/RegistrationContext'
import style from './Header.module.css'
import type React from 'react'

export default function Header({ children }: { children: React.ReactNode }) {
  const {user} = UseRegistrationContext()
  return (
    <header className={style.header}>
      <nav>
        <div className={style.userInfo}><h2>{user?.email}</h2></div>
        {children}
      </nav>
  
   </header>
  )
}
