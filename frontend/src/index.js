import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import ChatBox from './components/ChatBox';
import RegisterPage from './pages/RegisterPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage></MainPage>}>
          <Route path=':user_id' element={<ChatBox></ChatBox>}></Route>
        </Route>
        <Route path='register' element={<RegisterPage/>}></Route>
        <Route path="login" element={<LoginPage></LoginPage>}></Route>
        <Route path='*' element={<div>ERROR 404</div>}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
