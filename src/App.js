import './App.css';
import { Route, Routes } from 'react-router-dom';
import ManagementPage from "./components/statiscial/ManagementPage";
import LeftSideBar from "./components/LeftSideBar";

function App() {
  return (
      <div className='row mx-0'>
    <Routes>
        <Route path='/' element={<LeftSideBar />}/>
      <Route path='/home' element={<ManagementPage />} />
    </Routes>
      </div>
  );
}

export default App;
