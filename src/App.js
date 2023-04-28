
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import EmployeeDetail from './components/login/EmployeeDetail';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/employee' element={<EmployeeDetail />} />
    </Routes>
  );
}

export default App;
