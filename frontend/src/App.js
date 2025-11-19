import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Doctors from "./components/Doctors";
import Appointments from "./components/Appointments";
import BookAppointment from "./components/BookAppointment";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/register">Register</Link> |{" "}
        <Link to="/login">Login</Link> |{" "}
        <Link to="/doctors">Doctors</Link> |{" "}
        <Link to="/appointments">Appointments</Link> |{" "}
        <Link to="/book">Book Appointment</Link>
      </nav>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/book" element={<BookAppointment />} />
      </Routes>
    </Router>
  );
}

export default App;
