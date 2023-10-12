import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from './pages/LoginPage';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<LoginPage></LoginPage>}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
