import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Course from './pages/Course'
import Profile from './pages/Profile'
import Layout from './components/Layout'
import Home from './pages/Home'
import CrudDelete from './pages/crud/crudDelete'
import Add from './pages/Add'



function App() {
  return (
    <>
      <BrowserRouter>
      
          <Routes>
          <Route path='/login' element={<Login />} />
         
            <Route path='/' element={<Dashboard />} />
            <Route path='/home' element={<Home />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/course' element={<Course />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/addproduct' element={<Add />} />
            <Route path='/cruds/:_id/delete' element={<CrudDelete/>} />
           
            
         
            
          </Routes>
      
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
