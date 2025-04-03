import React from 'react'
import News from './pages/News.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import { Routes, Route } from 'react-router-dom'
import Magazine from './pages/Magazine.jsx'

const App = () => {
  return (
    <>
      <Navbar />
        <Routes>
          <Route path='/' element={<News />} />
          <Route path='/magazine' element={<Magazine />} />
        </Routes>
      <Footer />
    </>
  )
}

export default App
