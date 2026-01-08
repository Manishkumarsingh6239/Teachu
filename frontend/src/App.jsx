import { useUser } from '@clerk/clerk-react';
import { useState } from 'react'
import { Toaster } from 'react-hot-toast';
import { Routes, Route, Navigate } from 'react-router';
import HomePage from './pages/HomePage.jsx';
import ProblemPage from './pages/ProblemPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';


function App() {
  const {isSignedIn,isLoaded} = useUser()
  if(!isLoaded) return null;
  console.log(isSignedIn)
  return (
    <>
      <Routes>
        <Route path="/" element={!isSignedIn ? <HomePage /> : <Navigate to={"/dashboard"} />} />
        <Route path="/dashboard" element={isSignedIn ? <DashboardPage /> : <Navigate to={"/"} />} />
        <Route path="/problems" element={isSignedIn ? <ProblemPage /> : <Navigate to={"/"} />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}

export default App
