import { useUser } from '@clerk/clerk-react';
import { useState } from 'react'
import { Toaster } from 'react-hot-toast';
import { Routes, Route, Navigate } from 'react-router';
import HomePage from './pages/HomePage.jsx';
import ProblemPage from './pages/ProblemPage.jsx';


function App() {
  const {isSignedIn} = useUser()
  console.log(isSignedIn)
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/problems" element={isSignedIn ? <ProblemPage /> : <Navigate to="/" />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}

export default App
