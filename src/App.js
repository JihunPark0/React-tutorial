import "./index.css";
import Header from "./components/Header";
import Employees from "./pages/Employees";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Customers from "./pages/Customers";
function App() {
  return (
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path="/Employees" element={<Employees />}></Route>
          <Route path="/customers" element={<Customers />}></Route>
        </Routes>
      </Header>
    </BrowserRouter>
  );
}

export default App;
