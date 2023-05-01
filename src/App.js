import "./index.css";
import Header from "./components/Header";
import Employees from "./pages/Employees";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Customers from "./pages/Customers";
import Dictionary from "./pages/Dictionary";
import Definition from "./components/Definition";
function App() {
  return (
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path="/employees" element={<Employees />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/dictionary" element={<Dictionary />} />
          <Route path="/definition/:search" element={<Definition />} />
          {/*:search is a URL parameter which can be accessed from Definition component using 'useParams hook'*/}
        </Routes>
      </Header>
    </BrowserRouter>
  );
}

export default App;
