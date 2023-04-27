
// import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';

import Notification from './components/notification/Notification';
import NotificationCreate from './components/notification/NotificationCreate';
import NotificationDetailList from './components/notification/NotificationDetailList';
import Invoice from './components/invoice/Invoice';
function App() {
  return (
    <>
      <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/notifications' element={<Notification />} />
      <Route path='/notifications/detail/:id' element={<NotificationDetailList />} />
      <Route path='/notifications/create' element={<NotificationCreate />} />
  <Route path='/invoice' element={<Invoice />} />


    </Routes>
    </>
  
  );
}

export default App;
