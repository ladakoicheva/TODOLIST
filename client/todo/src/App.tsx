
import { BrowserRouter } from 'react-router';
import { Routes, Route } from 'react-router';
import './App.css';
import TodoList from './components/TodoList/TodoList';
import ItemInfo from './pages/ItemInfo/ItemInfo';
import Header from './components/Header/Header';
import Modal from './components/Modal/Modal';
import { useState } from 'react';
import Button from './components/Button/Button';
import { RegistrationContext,UseRegistration } from './context/RegistrationContext';

function App() {
  
const [isModalOpen,setIsModalOpen] = useState(false)
const openModal = () => setIsModalOpen(true);
const closeModal = () => setIsModalOpen(false);
const register = UseRegistration()
  

  return (
    <BrowserRouter>
      <RegistrationContext.Provider value={register} >
        <Header><Button onClick={openModal} text='Sign Up' isAsync={false} /></Header>
        {isModalOpen && <Modal close={ closeModal}  />}
      </RegistrationContext.Provider>
     
      <Routes>
        <Route path='/' element={<TodoList />} />
        <Route path='/:id' element={<ItemInfo />} />
      </Routes>
     
    </BrowserRouter>
  
  )
}

export default App
