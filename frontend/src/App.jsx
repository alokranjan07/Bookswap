 import React from 'react'
 import { Routes,Route } from 'react-router-dom'
 import Home from './pages/Home'
 import Booklist  from './pages/Booklist'
 function App() {
   return (
     <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/SwapBooks" element={<Booklist/>}/>
      
      </Routes>
      </div>
   )
 }
 
 export default App