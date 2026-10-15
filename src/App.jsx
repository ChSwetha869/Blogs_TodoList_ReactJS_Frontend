import { useState, useEffect } from 'react'
import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from './pages/login/login'
import Registration from './pages/registration/registration'
import Home from './pages/home/home'
import Navbar from './components/navbar/navbar'
import Footer from './components/footer/footer'
import CategoryBlogs from './pages/categoryBlogs/categoryBlogs'
import DedicatedBlogs from './pages/dedicatedBlogs/dedicatedBlogs'
import TaskManagement from './pages/taskManagement/taskManagement'

function App() {
  const navigate = useNavigate();
  useEffect(()=> {
    const navigation = performance.getEntriesByType('navigation')[0];
    if(navigation?.type == 'reload') {
      navigate('/')
    }
  }, [])
  
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/Blogs/:category" element={<CategoryBlogs />} />
        <Route path="/Blog/:id" element={<DedicatedBlogs />} />
        <Route path="/TaskManagement" element={<TaskManagement />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App;
