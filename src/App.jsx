import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { AuthProvide } from './context/AuthContext';

function App() {
  return (
    <>
      <AuthProvide>
        <Navbar />
        <Toaster position="top-center" />
        <main className='min-h-screen max-w-screen-2xl mx-auto px-4 py-6 font-primary'>
          <Outlet />
        </main>
        <Footer />
      </AuthProvide>
    </>
  );
}

export default App;

