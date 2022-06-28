import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NewTicket from "./pages/Ticket/NewTicket";
import Tickets from "./pages/Ticket/Tickets";
import Ticket from "./pages/Ticket/Ticket";

// Components
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header></Header>
          <Routes>
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/" element={<Home />}></Route>
            </Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/new-ticket" element={<PrivateRoute />}>
              <Route path="/new-ticket" element={<NewTicket />}></Route>
            </Route>
            <Route path="/tickets" element={<PrivateRoute />}>
              <Route path="/tickets" element={<Tickets />}></Route>
            </Route>
            <Route path="/ticket/:id" element={<PrivateRoute />}>
              <Route path="/ticket/:id" element={<Ticket />}></Route>
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer></ToastContainer>
    </>
  );
}
export default App;
