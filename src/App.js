import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import CreateCustomer from './components/customer/CreateCustomer';
import EditCustomer from './components/customer/EditCustomer';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='customer/create' element={<CreateCustomer />} />
      <Route path='customer/edit/:id' element={<EditCustomer />} />
    </Routes>
  );
}

export default App;
