import './App.css';
import { Outlet, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import EmployeeDetail from './components/login/EmployeeDetail';
import Notification from './components/notification/Notification';
import NotificationCreate from './components/notification/NotificationCreate';
import NotificationDetailList from './components/notification/NotificationDetailList';
import Invoice from './components/invoice/Invoice';
import Statistics from './components/statistics/statistics';
import DataEntry from './components/data_entry/dataEntry'
import ListProduct from './components/product/ListProduct';
import AddProductForm from './components/product/AddProductForm';
import ManagementPage from "./components/statiscial/ManagementPage";
import LeftSideBar from './components/statiscial/LeftSideBar';
import { useEffect } from 'react';
import CustomerList  from './components/customer/CustomerList';

function App() {
  const token = localStorage.getItem('token')
  
  return (
    <>
    <div className='row mx-0'>
      <Routes>
      <Route path='/' element={<Login />}/>
      <Route path='/' element={<LeftSideBar />}>
      <Route path='/home' element={<ManagementPage />} />
      <Route path='/notifications' element={<Notification />} />
      <Route path='/notifications/detail/:id' element={<NotificationDetailList />} />
      <Route path='/notifications/create' element={<NotificationCreate />} />
      <Route path='/invoice' element={<Invoice />} />
      <Route path="/statistics" element={<Statistics />} />
      <Route path="/data-entry" element={<DataEntry />} />
      <Route path='/employee' element={<EmployeeDetail />} />
      <Route path='/product' element={<ListProduct />} />
      <Route path='/AddNewProduct' element={<AddProductForm />} />
      <Route path='/customer' element={<CustomerList />} />
      </Route>
    </Routes>
    </div>
    </>
  );
}

export default App;
