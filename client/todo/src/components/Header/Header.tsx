import { useAppSelector } from '../../redux/hooks';
import style from './Header.module.css'
import type React from 'react'

export default function Header({ children }: { children: React.ReactNode }) {

  const { user } = useAppSelector((s) => s.user);
  return (
    <header className={style.header}>
      <nav>
        <div className={style.userInfo}><h2>{user?.email }</h2></div>
        {children}
      </nav>
  
   </header>
  )
}
