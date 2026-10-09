
import { BrowserRouter } from 'react-router';
import { Routes, Route } from 'react-router';
import './App.css';
import TodoList from './components/TodoList/TodoList';
import ItemInfo from './pages/ItemInfo/ItemInfo';
import Header from './components/Header/Header';
import Modal from './components/Modal/Modal';
import {  useState } from 'react';
import Button from './components/Button/Button';
import { UserAuthContext, UseUserAuth } from './context/UserAuthContext';
import { logout } from './api/users';

function App() {
  
const [isModalOpen,setIsModalOpen] = useState(false)
const openModal = () => setIsModalOpen(true);
const closeModal = () => setIsModalOpen(false);
  

  const logoutUser = async () => {
    const res = await logout();
    if (res.ok) {
      localStorage.removeItem('token');
      register.changeUserData(null);
    }
}
const register = UseUserAuth();
console.log(register.isAuth)

console.log(register.user)
  return (
    <BrowserRouter>
      <UserAuthContext.Provider value={register} >
        <Header>
          <Button onClick={!register.isAuth?openModal:logoutUser} text={ !register.isAuth
            ? register.authMode
            : 'Log Out'} isAsync={false} />
        </Header>
        {isModalOpen && <Modal close={ closeModal}  />}
      </UserAuthContext.Provider>
     
      <Routes>
        <Route path='/' element={<TodoList />} />
        <Route path='/:id' element={<ItemInfo />} />
      </Routes>
     
    </BrowserRouter>
  
  )
}

export default App
