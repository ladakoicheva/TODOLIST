
import { BrowserRouter, Routes, Route } from 'react-router';
import './App.css';
import { useState } from 'react';
import Loader from './components/Loader/Loader';
import Header from './components/Header/Header';
import Button from './components/Button/Button';
import { logoutUser } from './features/user/userSlice';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import AddProductPage from './pages/AddProductPage/AddProductPage';
import Auth from './features/user/Auth';
import Modal from './components/Modal/Modal';


function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const dispatch = useAppDispatch();
  const { isAuth, mode, isLoadingApp } = useAppSelector((s) => s.user);

  return (
    <BrowserRouter>
      {isLoadingApp && <Loader />}
        <Auth />
  
      <Header>
        <Button
          onClick={!isAuth ? openModal : () => dispatch(logoutUser())}
          text={!isAuth ? mode : 'Log Out'}
          isAsync={false}
        />
      </Header>

      {isModalOpen && (
       
          <Modal close={closeModal} />
       
      )}

     
        <Routes>
          <Route path='/' element={<AddProductPage />} />
        </Routes>
      
    </BrowserRouter>
  );
}

export default App;