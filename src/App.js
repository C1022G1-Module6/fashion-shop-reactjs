import './App.css';
import { Route, Routes } from 'react-router-dom';
import ManagementPage from "./components/statiscial/ManagementPage";

function App() {
  return (
    <Routes>
      <Route path='/' element={<ManagementPage />} />
    </Routes>
  );
}

export default App;
