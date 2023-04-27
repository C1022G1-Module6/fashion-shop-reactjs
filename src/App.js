import './App.css';
import { Route, Routes } from 'react-router-dom';
import Invoice from './components/invoice/Invoice';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Invoice />} />
    </Routes>
  );
}

export default App;
