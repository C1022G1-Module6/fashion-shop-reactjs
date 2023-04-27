import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import ListProduct from "./components/product/ProductList";
import React from "react";

function App() {
  return (
    <Routes>
      {/*<Route path='/' element={<Login />} />*/}
      <Route path='/' element={<ListProduct />} />
    </Routes>
  );
}

export default App;
