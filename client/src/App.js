import logo from "./logo.svg";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminRoutes from "./Layouts/Admin/AdminRoutes";
import CustomerRoutes from "./Layouts/Customer/CustomerRoutes";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/Admin/*" element={<AdminRoutes />} />
          <Route exact path="/*" element={<CustomerRoutes />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
