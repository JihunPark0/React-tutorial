import "./index.css";
import Header from "./components/Header";
import Employees from "./pages/Employees";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Customers from "./pages/Customers";
function App() {
  return (
    <Header>
      <BrowserRouter>
        <Routes>
          <Route path="/Employees" element={<Employees />}></Route>
          <Route path="/customers" element={<Customers />}></Route>
        </Routes>
      </BrowserRouter>
    </Header>
  );
}

export default App;
