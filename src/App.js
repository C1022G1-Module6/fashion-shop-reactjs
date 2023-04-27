// import logo from './logo.svg';
import "./App.css";
import { Route, Routes } from "react-router-dom";
// import Login from './components/Login';
// import Invoice from './components/invoice/Invoice';
import Statistics from "./components/statistics/statistics";
import DataEntry from "./components/data-entry/dataEntry";

function App() {
  return (
    <>
      <Routes>
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/data-entry" element={<DataEntry />} />
      </Routes>
    </>
  );
}

export default App;
