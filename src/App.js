// import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
// import Login from './components/Login';
import CustomerList from "./components/customer/CustomerList";
import React from "react";

function App() {
  return (
    <Routes>
      {/*<Route path='/' element={<Login />} />*/}
      <Route path='/' element={<CustomerList />} />
    </Routes>
  );
}

export default App;
