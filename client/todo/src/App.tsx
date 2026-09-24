
import { BrowserRouter } from 'react-router'
import { Routes,Route } from 'react-router'
import './App.css'
import TodoList from './components/TodoList/TodoList'
import ItemInfo from './components/ItemInfo/ItemInfo'

function App() {
  
 

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<TodoList />} />
        <Route path='/:id' element={ <ItemInfo/>} />
      </Routes>
     
    </BrowserRouter>
  
  )
}

export default App
