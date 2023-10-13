import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import ChatBox from './components/ChatBox';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage></MainPage>}>
          <Route path='chat/:user_id' element={<ChatBox></ChatBox>}></Route>
        </Route>
        <Route path="login" element={<LoginPage></LoginPage>}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
