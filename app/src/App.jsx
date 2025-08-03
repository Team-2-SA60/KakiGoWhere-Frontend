import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css'
import AdminLogin from './pages/AdminLogin';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path = '/admin/login' element={<AdminLogin />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
