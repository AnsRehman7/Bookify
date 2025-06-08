import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Register } from './components/Register';
import { Home } from './components/Home';
import Login from './components/Login';
import { Dashboard } from './components/Dashboard';
import { AddBooksToList } from './components/AddBookstoList';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/add-book" element={<AddBooksToList/>} />
      
      </Routes>
  );
}

export default App;
